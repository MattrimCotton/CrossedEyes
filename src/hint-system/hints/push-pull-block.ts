import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

export class HPushPullBlock implements HintBase {
    entryName = 'PushPullBlock' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.PushPullBlock.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.PushPullBlock)) throw new Error()
        return Lang.hints.PushPullBlock
    }
}
