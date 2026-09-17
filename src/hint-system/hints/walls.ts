import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

declare global {
    namespace ig {
        namespace ENTITY {
            interface WallBlocker {
                parentWall: ig.ENTITY.WallBase
            }
        }
    }
}

export class HWalls implements HintBase {
    entryName = 'Walls' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.WallBase.inject({
            updateWallBlockers(...args) {
                for (const wall of this.wallBlockers) {
                    wall.parentWall = this
                }
                return this.parent(...args)
            },
        })
        ig.ENTITY.WallBlocker.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !(Opts.hints && this.parentWall.active) }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.WallBlocker)) throw new Error()

        const lang = { ...Lang.hints.Wall }
        const whatBlocks = `${
            // prettier-ignore
            e.coll.type == ig.COLLTYPE.FENCE
                ? lang.blocksEverything
                : e.coll.type == ig.COLLTYPE.NPFENCE
                ? lang.blocksPlayers
                : e.coll.type == ig.COLLTYPE.PBLOCK
                ? lang.blocksPlayers
                : ''
        }`
        if (e.parentWall.condition && e.parentWall.condition.code != 'true') lang.name = lang.nameConditional
        lang.name = lang.name.supplant({ whatBlocks })
        lang.description = lang.description.supplant({ whatBlocks })
        return lang
    }
}

/* WallHorizontal/WallVertical are the actual wall segments placed in maps (both `extends
 * ig.ENTITY.WallBase {}` with no added members -- see the typedef). WallBlocker above is a
 * separate, already-hinted companion gate object that can sit at a wall's end; the wall segment
 * itself had no hint at all before this. */
export class HWallSegment implements HintBase {
    entryName = 'WallSegment' as const

    constructor() {
        /* run in prestart */
        const self = this
        const settings: Omit<sc.QuickMenuTypesBaseSettings, 'entity'> = {
            type: 'Hints',
            hintName: self.entryName,
            hintType: 'Puzzle',
        }
        ig.ENTITY.WallHorizontal.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { ...settings, disabled: !Opts.hints || !this.active }
            },
        })
        ig.ENTITY.WallVertical.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { ...settings, disabled: !Opts.hints || !this.active }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.WallHorizontal) && !(e instanceof ig.ENTITY.WallVertical)) throw new Error()

        const lang = { ...Lang.hints.Wall }
        const whatBlocks =
            e.wallCollType == 'BLOCK' ? lang.blocksEverything : e.wallCollType == 'PBLOCK' ? lang.blocksPlayers : lang.blocksNonPlayers
        if (e.condition && e.condition.code != 'true') lang.name = lang.nameConditional
        lang.name = lang.name.supplant({ whatBlocks })
        lang.description = lang.description.supplant({ whatBlocks })
        return lang
    }
}
