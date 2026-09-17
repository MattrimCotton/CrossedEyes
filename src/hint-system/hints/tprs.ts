import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

/* NOTE: I call a thing that move me from map to another map "tpr" */

type TprsFlagSupported = ig.ENTITY.Door | ig.ENTITY.TeleportGround | ig.ENTITY.TeleportField
function getVarName(e: TprsFlagSupported): string {
    return genVarName('map', '', e.name!, e.map, e.marker)
}
function genVarName(prefix: string, currMap: string, name: string, map: string, marker: string): string {
    if (typeof name != 'string' || !name) name = ''
    if (typeof map != 'string' || !map) map = ''
    if (typeof marker != 'string' || !marker) marker = ''
    return `${prefix}${currMap.toCamel().replace(/\./, '/')}.crossedeyes-tpr-entered_${name.replace(/\./, '@')}-${map.toCamel().replace(/\./, '/')}-${marker.replace(
        /\./,
        '@'
    )}`
}

function getDestMapName(e: TprsFlagSupported): string {
    const visited: boolean = ig.vars.get(getVarName(e))
    const destMapName = visited ? sc.map.getMapName(e.map).toString() : Lang.hints.unknownDestMap
    if (/* this is true when the map isnt in the current area */ destMapName == ig.game.mapName) {
        const area = e.map.substring(0, e.map.indexOf('.'))
        let areaName = sc.map.getAreaName(area)
        if (!areaName) {
            /* ughhhhhhh */
            /* this is a egde case where the area has different names in fs and sc.map.areas;
             * for example: autumn in fs and autumn-area in sc.map.areas */
            areaName = sc.map.getAreaName(
                (
                    JSON.parse(
                        (0, eval)("require('fs')")
                            .readFileSync(`assets/data/maps/${e.map.replace('.', '/')}.json`)
                            .toString()
                    ) as sc.MapModel.Map
                ).attributes.area
            )
        }
        return Lang.hints.areaTemplate.supplant({ area })
    }
    return destMapName
}

let justEnteredTpr: boolean = false

export class HDoor implements HintBase {
    entryName = 'Door' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.Door.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return {
                    type: 'Hints',
                    hintName: self.entryName,
                    hintType: 'Puzzle',
                    disabled: !(Opts.hints && this.name && this.map && this.condition.code != 'false'),
                }
            },
            open(entity, data) {
                if (Opts.hints && this.name && this.map) {
                    ig.vars.set(getVarName(this), true)
                    justEnteredTpr = true
                }
                this.parent(entity, data)
            },
        })

        /* the code below applies for all tpr's */
        function filterTprs(e: ig.Entity[]): TprsFlagSupported[] {
            return e.filter(e => e instanceof ig.ENTITY.Door || e instanceof ig.ENTITY.TeleportGround || e instanceof ig.ENTITY.TeleportField) as any[]
        }
        ig.Game.inject({
            loadLevel(data, clearCache, reloadCache) {
                this.parent(data, clearCache, reloadCache)
                if (justEnteredTpr) {
                    let entities = filterTprs(ig.game.entities.filter(e => e.name == ig.game.marker))
                    if (entities.length != 1) {
                        entities = filterTprs(ig.game.getEntitiesInCircle(ig.game.playerEntity.coll.pos, 4 * 16, 1, 300))
                    }
                    for (const e of entities) {
                        const path = genVarName('maps.', ig.game.mapName, e.name!, e.map, e.marker)
                        ig.vars.set(path, true)
                    }
                    justEnteredTpr = false
                }
            },
        })
    }

    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.Door)) throw new Error()

        const lang = { ...Lang.hints.Door }
        if (!e.active) lang.name = lang.nameInactive
        lang.name = lang.name.supplant({ destMapName: getDestMapName(e) })
        return lang
    }
}

export class HTeleportField implements HintBase {
    entryName = 'TeleportField' as const
    disableWalkedOn = true

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.TeleportField.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return {
                    type: 'Hints',
                    hintName: self.entryName,
                    hintType: 'Puzzle',
                    disabled: !(Opts.hints && this.interactEntry),
                }
            },
            onInteraction() {
                this.parent()
                if (Opts.hints) {
                    ig.vars.set(getVarName(this), true)
                    justEnteredTpr = true
                }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.TeleportField)) throw new Error()

        const text: string | undefined = ((e.interactEntry.gui.subGui as sc.IconHoverTextGui).getChildGuiByIndex(0).gui as sc.TextGui).text?.toString()
        const lang = { ...Lang.hints.TeleportField }
        if (text) {
            lang.name = lang.nameWithMap
            lang.description = lang.descriptionWithMap
            lang.description = lang.description.supplant({
                destPlaceName: text ?? '',
            })
        }
        lang.name = lang.name.supplant({
            destPlaceName: text ?? '',
            conditionalVisited: ig.vars.get(getVarName(e)) ? `, ${Lang.hints.TeleportField.visitedSuffix}` : '',
        })
        return lang
    }
}

export class HTeleportGround implements HintBase {
    entryName = 'TeleportGround' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.TeleportGround.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
            collideWith(entity, dir) {
                this.parent(entity, dir)
                if (/* this means the player just entered the tpr */ this.coll.ignoreCollision && Opts.hints) {
                    ig.vars.set(getVarName(this), true)
                    justEnteredTpr = true
                }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.TeleportGround)) throw new Error()

        const lang = { ...Lang.hints.TeleportGround }
        lang.name = lang.name.supplant({ destMapName: getDestMapName(e) })
        return lang
    }
}

export class HElevator implements HintBase {
    entryName = 'Elevator' as const

    constructor() {
        /* run in prestart */
        const self = this
        sc.ElevatorSwitchEntity.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return {
                    type: 'Hints',
                    hintName: self.entryName,
                    hintType: 'Puzzle',
                    disabled: !(Opts.hints && this.groundEntity.condition.code != 'false'),
                }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof sc.ElevatorSwitchEntity)) throw new Error()

        const lang = Lang.hints.Elevator
        if (!e.groundEntity.condition.evaluate()) lang.name = lang.nameInactive
        return lang
    }
}

/* TeleportCentral and TeleportStairs are also "things that move me from map to another map", same
 * family as Door/TeleportGround/TeleportField above, but they're kept deliberately separate from
 * TprsFlagSupported/filterTprs/getDestMapName here rather than folded into that machinery: those
 * rely on hooking each entity's own entry-trigger method (open/onInteraction/collideWith) to flag
 * "just visited" for the destination-name reveal, and I couldn't confirm TeleportCentral's or
 * TeleportStairs' equivalent trigger method from the typedefs alone without risking a wrong guess
 * that silently breaks the existing, working visited-tracking for the other three. These two get
 * a simpler, static hint instead: it tells a blind player the transition point exists at all
 * (previously zero indication of that), without claiming a resolved destination name I can't
 * verify gets flagged correctly. */
export class HTeleportCentral implements HintBase {
    entryName = 'TeleportCentral' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.TeleportCentral.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.TeleportCentral)) throw new Error()
        return Lang.hints.TeleportCentral
    }
}

export class HTeleportStairs implements HintBase {
    entryName = 'TeleportStairs' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.TeleportStairs.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.TeleportStairs)) throw new Error()
        return Lang.hints.TeleportStairs
    }
}
