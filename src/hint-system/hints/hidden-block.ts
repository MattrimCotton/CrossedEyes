import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

export class HHiddenBlock implements HintBase {
    entryName = 'HiddenBlock' as const

    private getLang(e: ig.ENTITY.HiddenBlock): HintData | undefined {
        // prettier-ignore
        if (e.coll.shape == ig.COLLSHAPE.RECTANGLE && (
                e.coll.heightShape == ig.COLL_HEIGHT_SHAPE.EAST_UP ||
                e.coll.heightShape == ig.COLL_HEIGHT_SHAPE.WEST_UP ||
                e.coll.heightShape == ig.COLL_HEIGHT_SHAPE.NORTH_UP ||
                e.coll.heightShape == ig.COLL_HEIGHT_SHAPE.SOUTH_UP)
        ) return Lang.hints.HiddenBlock.stairs
    }

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.HiddenBlock.inject({
            init(x, y, z, settings) {
                this.parent(x, y, z, settings)
            },
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Climbable', disabled: !Opts.hints || !self.getLang(this) }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.HiddenBlock)) throw new Error()
        return this.getLang(e)!
    }
}

/* HiddenSkyBlock is a separate class (`interface HiddenSkyBlock extends ig.Entity {}`), not a
 * subclass of HiddenBlock, despite the shared file/name -- it gets none of the hint above.
 * Real usage (arena/boss/frobbit-boss.json) is a long, thin NPBLOCK/RECTANGLE barrier, i.e. an
 * invisible aerial wall/platform rather than the stairs-specific case HiddenBlock covers. */
export class HHiddenSkyBlock implements HintBase {
    entryName = 'HiddenSkyBlock' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.HiddenSkyBlock?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.HiddenSkyBlock)) throw new Error()
        return Lang.hints.HiddenSkyBlock
    }
}
