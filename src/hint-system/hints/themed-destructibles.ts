import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

/* ItemDestruct and RegenDestruct both extend ig.AnimatedEntity directly, not ig.ENTITY.Destructible
 * (see destructible.ts) -- they're separate sibling classes with their own large named-variant
 * registries (sc.ITEM_DESTRUCT_TYPE / sc.REGEN_DESTRUCT_TYPE, dozens/several entries each), so
 * neither inherited the existing Destructible hint. Kept generic rather than replicating a full
 * per-variant lookup table like HDestructible's, since most variants are purely cosmetic reskins. */
export class HItemDestruct implements HintBase {
    entryName = 'ItemDestruct' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.ItemDestruct.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.ItemDestruct)) throw new Error()
        return Lang.hints.ItemDestruct
    }
}

export class HRegenDestruct implements HintBase {
    entryName = 'RegenDestruct' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.RegenDestruct.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.RegenDestruct)) throw new Error()
        return Lang.hints.RegenDestruct
    }
}

export class HWaveTeleport implements HintBase {
    entryName = 'WaveTeleport' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.WaveTeleport.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.WaveTeleport)) throw new Error()
        return Lang.hints.WaveTeleport
    }
}
