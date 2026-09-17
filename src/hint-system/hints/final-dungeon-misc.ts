import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

/* FerroLine, FerroRespawner, BossPlatform, KeyPanel, QuicksandHole and RespawnBlocker have no
 * typedefs in ultimate-crosscode-typedefs at all. Settings shapes read from real map JSON
 * (final-dng/test.json, arid-dng/second/f99/boss-2.json, cold-dng/*.json, heat/caves/*.json,
 * autumn-fall/path-09.json in a live game install). FerroLine/FerroRespawner are Final Dungeon
 * exclusive per the entity-type inventory in .claude/memory/accessibility-coverage-gap.md --
 * nothing else in the game uses them. */
declare global {
    namespace ig {
        namespace ENTITY {
            namespace FerroLine {
                interface Settings extends ig.Entity.Settings {}
            }
            interface FerroLine extends ig.AnimatedEntity {}
            interface FerroLineConstructor extends ImpactClass<FerroLine> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.FerroLine.Settings): FerroLine
            }
            var FerroLine: FerroLineConstructor

            namespace FerroRespawner {
                interface Settings extends ig.Entity.Settings {}
            }
            interface FerroRespawner extends ig.AnimatedEntity {}
            interface FerroRespawnerConstructor extends ImpactClass<FerroRespawner> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.FerroRespawner.Settings): FerroRespawner
            }
            var FerroRespawner: FerroRespawnerConstructor

            namespace BossPlatform {
                interface Settings extends ig.Entity.Settings {}
            }
            interface BossPlatform extends ig.AnimatedEntity {}
            interface BossPlatformConstructor extends ImpactClass<BossPlatform> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.BossPlatform.Settings): BossPlatform
            }
            var BossPlatform: BossPlatformConstructor

            /* KeyPanel.Settings already exists in ultimate-crosscode-typedefs; only the entity class itself is missing */
            interface KeyPanel extends ig.AnimatedEntity {}
            interface KeyPanelConstructor extends ImpactClass<KeyPanel> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.KeyPanel.Settings): KeyPanel
            }
            var KeyPanel: KeyPanelConstructor

            namespace QuicksandHole {
                interface Settings extends ig.Entity.Settings {
                    map?: string
                    marker?: string
                }
            }
            interface QuicksandHole extends ig.AnimatedEntity {}
            interface QuicksandHoleConstructor extends ImpactClass<QuicksandHole> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.QuicksandHole.Settings): QuicksandHole
            }
            var QuicksandHole: QuicksandHoleConstructor

            namespace RespawnBlocker {
                interface Settings extends ig.Entity.Settings {}
            }
            interface RespawnBlocker extends ig.Entity {}
            interface RespawnBlockerConstructor extends ImpactClass<RespawnBlocker> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.RespawnBlocker.Settings): RespawnBlocker
            }
            var RespawnBlocker: RespawnBlockerConstructor
        }
    }
}

export class HFerroSpot implements HintBase {
    entryName = 'FerroSpot' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.FerroSpot.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.FerroSpot)) throw new Error()
        const lang = { ...Lang.hints.FerroSpot }
        if (e.source) lang.name = lang.nameSource
        return lang
    }
}

export class HFerroLine implements HintBase {
    entryName = 'FerroLine' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.FerroLine?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.FerroLine)) throw new Error()
        return Lang.hints.FerroLine
    }
}

export class HFerroRespawner implements HintBase {
    entryName = 'FerroRespawner' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.FerroRespawner?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.FerroRespawner)) throw new Error()
        return Lang.hints.FerroRespawner
    }
}

export class HBossPlatform implements HintBase {
    entryName = 'BossPlatform' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.BossPlatform?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.BossPlatform)) throw new Error()
        return Lang.hints.BossPlatform
    }
}

export class HKeyPanel implements HintBase {
    entryName = 'KeyPanel' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.KeyPanel?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.KeyPanel)) throw new Error()
        return Lang.hints.KeyPanel
    }
}

export class HQuicksandHole implements HintBase {
    entryName = 'QuicksandHole' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.QuicksandHole?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.QuicksandHole)) throw new Error()
        return Lang.hints.QuicksandHole
    }
}

export class HRespawnBlocker implements HintBase {
    entryName = 'RespawnBlocker' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.RespawnBlocker?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.RespawnBlocker)) throw new Error()
        return Lang.hints.RespawnBlocker
    }
}
