import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

/* WaterBlock, SteamOven, SteamPipe and SteamTurnout have no typedefs in ultimate-crosscode-typedefs
 * at all (the "WaterBlock"/"Lorry" hits in map-style.d.ts are MapStyleType tileset definitions, not
 * the actual entity classes -- false positives, checked directly). Settings shapes read from real
 * map JSON (arena/faction/af-firebuffel-1.json, arid-dng/first/room-04.json, heat-dng/test.json,
 * heat-dng/f3/room-06.json in a live game install). */
declare global {
    namespace ig {
        namespace ENTITY {
            namespace WaterBlock {
                interface Settings extends ig.Entity.Settings {
                    blockType?: string
                    changeDuration?: number
                }
            }
            interface WaterBlock extends ig.AnimatedEntity {}
            interface WaterBlockConstructor extends ImpactClass<WaterBlock> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.WaterBlock.Settings): WaterBlock
            }
            var WaterBlock: WaterBlockConstructor

            namespace SteamOven {
                interface Settings extends ig.Entity.Settings {
                    fastMode?: boolean
                }
            }
            interface SteamOven extends ig.AnimatedEntity {}
            interface SteamOvenConstructor extends ImpactClass<SteamOven> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.SteamOven.Settings): SteamOven
            }
            var SteamOven: SteamOvenConstructor

            namespace SteamPipe {
                interface Settings extends ig.Entity.Settings {
                    pipeType?: string
                }
            }
            interface SteamPipe extends ig.AnimatedEntity {}
            interface SteamPipeConstructor extends ImpactClass<SteamPipe> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.SteamPipe.Settings): SteamPipe
            }
            var SteamPipe: SteamPipeConstructor

            namespace SteamTurnout {
                interface Settings extends ig.Entity.Settings {
                    turnDefault?: string
                    turnAlt?: string
                    condition?: string
                }
            }
            interface SteamTurnout extends ig.AnimatedEntity {}
            interface SteamTurnoutConstructor extends ImpactClass<SteamTurnout> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.SteamTurnout.Settings): SteamTurnout
            }
            var SteamTurnout: SteamTurnoutConstructor
        }
    }
}

export class HWaterBlock implements HintBase {
    entryName = 'WaterBlock' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.WaterBlock?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.WaterBlock)) throw new Error()
        return Lang.hints.WaterBlock
    }
}

export class HWaterBubblePanel implements HintBase {
    entryName = 'WaterBubblePanel' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.WaterBubblePanel.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.WaterBubblePanel)) throw new Error()
        return Lang.hints.WaterBubblePanel
    }
}

export class HSteamOven implements HintBase {
    entryName = 'SteamOven' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.SteamOven?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.SteamOven)) throw new Error()
        return Lang.hints.SteamOven
    }
}

export class HSteamPipe implements HintBase {
    entryName = 'SteamPipe' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.SteamPipe?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.SteamPipe)) throw new Error()
        return Lang.hints.SteamPipe
    }
}

export class HSteamTurnout implements HintBase {
    entryName = 'SteamTurnout' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.SteamTurnout?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.SteamTurnout)) throw new Error()
        return Lang.hints.SteamTurnout
    }
}
