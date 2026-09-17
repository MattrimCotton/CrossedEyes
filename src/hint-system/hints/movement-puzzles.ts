import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

/* CompressorBouncer and RotateBlocker have no typedefs in ultimate-crosscode-typedefs at all.
 * Settings shapes read directly from real map JSON (lab-test.json, arena/boss/wave-boss.json,
 * arid-dng/second/f1/cold-2.json in a live game install). RotateBlocker's dir uses abbreviated
 * forms ("NE") that don't match the mod's existing Lang.misc.face8 keys, and the full value set
 * isn't confirmed from the samples seen, so its hint stays direction-agnostic rather than guessing. */
declare global {
    namespace ig {
        namespace ENTITY {
            namespace CompressorBouncer {
                interface Settings extends ig.Entity.Settings {
                    dir: keyof typeof ig.ActorEntity.FACE4
                    condition?: string
                }
            }
            interface CompressorBouncer extends ig.AnimatedEntity {
                settings: ig.ENTITY.CompressorBouncer.Settings
            }
            interface CompressorBouncerConstructor extends ImpactClass<CompressorBouncer> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.CompressorBouncer.Settings): CompressorBouncer
            }
            var CompressorBouncer: CompressorBouncerConstructor

            namespace RotateBlocker {
                interface Settings extends ig.Entity.Settings {
                    dir: string
                    condition?: string
                }
            }
            interface RotateBlocker extends ig.AnimatedEntity {}
            interface RotateBlockerConstructor extends ImpactClass<RotateBlocker> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.RotateBlocker.Settings): RotateBlocker
            }
            var RotateBlocker: RotateBlockerConstructor

            namespace SlidingBlock {
                interface Settings extends ig.Entity.Settings {}
            }
            interface SlidingBlock extends ig.AnimatedEntity {}
            interface SlidingBlockConstructor extends ImpactClass<SlidingBlock> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.SlidingBlock.Settings): SlidingBlock
            }
            var SlidingBlock: SlidingBlockConstructor
        }
    }
}

export class HCompressor implements HintBase {
    entryName = 'Compressor' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.Compressor.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.Compressor)) throw new Error()
        return Lang.hints.Compressor
    }
}

export class HAntiCompressor implements HintBase {
    entryName = 'AntiCompressor' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.AntiCompressor.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.AntiCompressor)) throw new Error()
        return Lang.hints.AntiCompressor
    }
}

export class HCompressorBouncer implements HintBase {
    entryName = 'CompressorBouncer' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.CompressorBouncer?.inject({
            init(x, y, z, settings) {
                this.parent(x, y, z, settings)
                this.settings = settings
            },
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.CompressorBouncer)) throw new Error()
        const dir = Lang.misc.face8[e.settings.dir]
        const lang = { ...Lang.hints.CompressorBouncer }
        lang.name = lang.name.supplant({ dir })
        return lang
    }
}

export class HRotateBlocker implements HintBase {
    entryName = 'RotateBlocker' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.RotateBlocker?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.RotateBlocker)) throw new Error()
        return Lang.hints.RotateBlocker
    }
}

export class HSlidingBlock implements HintBase {
    entryName = 'SlidingBlock' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.SlidingBlock?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.SlidingBlock)) throw new Error()
        return Lang.hints.SlidingBlock
    }
}

export class HMagnet implements HintBase {
    entryName = 'Magnet' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.Magnet.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.Magnet)) throw new Error()
        return Lang.hints.Magnet
    }
}

export class HTeslaCoil implements HintBase {
    entryName = 'TeslaCoil' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.TeslaCoil.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.TeslaCoil)) throw new Error()
        const lang = { ...Lang.hints.TeslaCoil }
        if (!e.source) lang.name = lang.nameExtender
        return lang
    }
}
