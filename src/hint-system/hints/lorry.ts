import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

/* Lorry, LorryRail and LorryRespawner have no typedefs in ultimate-crosscode-typedefs at all.
 * Settings shapes read directly from real map JSON (cold-dng/b1/room1.json, cold-dng/test.json
 * in a live game install) -- the minecart mechanic used in Cold/Heat/Shock Dungeons and the
 * Final Dungeon. Kept deliberately minimal/factual: which lever/rail direction it moves in isn't
 * exposed here since the full puzzle logic (multi-rail routing) isn't verifiable without the
 * actual game source. */
declare global {
    namespace ig {
        namespace ENTITY {
            namespace Lorry {
                interface Settings extends ig.Entity.Settings {
                    lorryType?: string
                    moveType?: string
                    initDir?: string
                    speed?: string
                    fastMode?: boolean
                    spawnCondition?: string
                }
            }
            interface Lorry extends ig.AnimatedEntity {}
            interface LorryConstructor extends ImpactClass<Lorry> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.Lorry.Settings): Lorry
            }
            var Lorry: LorryConstructor

            namespace LorryRail {
                interface Settings extends ig.Entity.Settings {
                    railType?: string
                }
            }
            interface LorryRail extends ig.AnimatedEntity {}
            interface LorryRailConstructor extends ImpactClass<LorryRail> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.LorryRail.Settings): LorryRail
            }
            var LorryRail: LorryRailConstructor

            namespace LorryRespawner {
                interface Settings extends ig.Entity.Settings {
                    lorryEntity?: { global: boolean; name: string }
                    initDir?: string
                }
            }
            interface LorryRespawner extends ig.AnimatedEntity {}
            interface LorryRespawnerConstructor extends ImpactClass<LorryRespawner> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.LorryRespawner.Settings): LorryRespawner
            }
            var LorryRespawner: LorryRespawnerConstructor
        }
    }
}

export class HLorry implements HintBase {
    entryName = 'Lorry' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.Lorry?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.Lorry)) throw new Error()
        return Lang.hints.Lorry
    }
}

export class HLorryRail implements HintBase {
    entryName = 'LorryRail' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.LorryRail?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.LorryRail)) throw new Error()
        return Lang.hints.LorryRail
    }
}

export class HLorryRespawner implements HintBase {
    entryName = 'LorryRespawner' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.LorryRespawner?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.LorryRespawner)) throw new Error()
        return Lang.hints.LorryRespawner
    }
}
