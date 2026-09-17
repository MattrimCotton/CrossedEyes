import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

/* PushPullDest has no typedef in ultimate-crosscode-typedefs at all. Settings shape read directly
 * from real map JSON (rhombus-dng/room-5-new.json, bergen/interior/guild-basement.json,
 * cold-dng/b1/room4.json in a live game install) -- it's where a PushPullBlock needs to be pushed
 * to complete the puzzle (zMove is negative, i.e. the block sinks in once correctly placed). */
declare global {
    namespace ig {
        namespace ENTITY {
            namespace PushPullDest {
                interface Settings extends ig.Entity.Settings {
                    pushPullDestType?: string
                    zMove?: number
                    saveType?: string
                    variable?: string
                }
            }
            interface PushPullDest extends ig.AnimatedEntity {}
            interface PushPullDestConstructor extends ImpactClass<PushPullDest> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.PushPullDest.Settings): PushPullDest
            }
            var PushPullDest: PushPullDestConstructor
        }
    }
}

export class HBombPanel implements HintBase {
    entryName = 'BombPanel' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.BombPanel.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.BombPanel)) throw new Error()
        return Lang.hints.BombPanel
    }
}

export class HPushPullDest implements HintBase {
    entryName = 'PushPullDest' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.PushPullDest?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.PushPullDest)) throw new Error()
        return Lang.hints.PushPullDest
    }
}

export class HWavePushPullBlock implements HintBase {
    entryName = 'WavePushPullBlock' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.WavePushPullBlock.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.WavePushPullBlock)) throw new Error()
        return Lang.hints.WavePushPullBlock
    }
}

export class HGroupSwitch implements HintBase {
    entryName = 'GroupSwitch' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.GroupSwitch.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.GroupSwitch)) throw new Error()
        return Lang.hints.GroupSwitch
    }
}
