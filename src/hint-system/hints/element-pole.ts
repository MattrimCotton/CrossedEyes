import { Lang } from '../../lang-manager'
import { StringToLowerCaseT } from '../../misc/modify-prototypes'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

/* ElementPoleDest and ElementShieldSrc have no typedefs in ultimate-crosscode-typedefs at all
 * (unlike ElementPole, which does). Settings shapes below were read directly from real map JSON
 * (assets/data/maps/{heat,arid}-dng/*.json in a live game install), not guessed. */
declare global {
    namespace ig {
        namespace ENTITY {
            namespace ElementPoleDest {
                interface Settings extends ig.Entity.Settings {
                    group: string
                    element: Exclude<keyof typeof sc.ELEMENT, 'NEUTRAL'> | ''
                    activeTime: number
                    variable: string
                }
            }
            interface ElementPoleDest extends ig.AnimatedEntity {
                settings: ig.ENTITY.ElementPoleDest.Settings
            }
            interface ElementPoleDestConstructor extends ImpactClass<ElementPoleDest> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.ElementPoleDest.Settings): ElementPoleDest
            }
            var ElementPoleDest: ElementPoleDestConstructor

            namespace ElementShieldSrc {
                interface Settings extends ig.Entity.Settings {
                    element: Exclude<keyof typeof sc.ELEMENT, 'NEUTRAL'> | ''
                }
            }
            interface ElementShieldSrc extends ig.AnimatedEntity {
                settings: ig.ENTITY.ElementShieldSrc.Settings
            }
            interface ElementShieldSrcConstructor extends ImpactClass<ElementShieldSrc> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.ElementShieldSrc.Settings): ElementShieldSrc
            }
            var ElementShieldSrc: ElementShieldSrcConstructor
        }
    }
}

function elementLangName(element: string): string | undefined {
    if (!element) return undefined
    return Lang.stats[StringToLowerCaseT(element) as keyof typeof Lang.stats] as string | undefined
}

export class HElementPole implements HintBase {
    entryName = 'ElementPole' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.ElementPole.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !Opts.hints, aimBounceWhitelist: true }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.ElementPole)) throw new Error()
        return Lang.hints.ElementPole
    }
}

export class HElementPoleDest implements HintBase {
    entryName = 'ElementPoleDest' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.ElementPoleDest?.inject({
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
        if (!(e instanceof ig.ENTITY.ElementPoleDest)) throw new Error()
        const elementName = elementLangName(e.settings.element)
        const lang = { ...Lang.hints.ElementPoleDest }
        if (elementName) lang.description = lang.descriptionElement.supplant({ element: elementName })
        return lang
    }
}

export class HElementShieldSrc implements HintBase {
    entryName = 'ElementShieldSrc' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.ElementShieldSrc?.inject({
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
        if (!(e instanceof ig.ENTITY.ElementShieldSrc)) throw new Error()
        const elementName = elementLangName(e.settings.element)
        const lang = { ...Lang.hints.ElementShieldSrc }
        if (elementName) lang.name = lang.nameElement.supplant({ element: elementName })
        return lang
    }
}
