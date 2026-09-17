import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { HintBase, HintData } from '../hint-system'

/* ig.ENTITY.JumpPanel is missing from ultimate-crosscode-typedefs (only JumpPanelFar is declared there) */
declare global {
    namespace ig {
        namespace ENTITY {
            namespace JumpPanel {
                interface Settings {
                    jumpHeight: string
                    condition?: string
                }
            }
            interface JumpPanel extends ig.AnimatedEntity {
                condition?: ig.VarCondition
            }
            interface JumpPanelConstructor extends ImpactClass<JumpPanel> {
                new (x: number, y: number, z: number, settings: ig.ENTITY.JumpPanel.Settings): JumpPanel
            }
            var JumpPanel: JumpPanelConstructor
        }
    }
}

export class HJumpPanel implements HintBase {
    entryName = 'JumpPanel' as const

    constructor() {
        /* run in prestart */
        const self = this
        ig.ENTITY.JumpPanel?.inject({
            getQuickMenuSettings(): Omit<sc.QuickMenuTypesBaseSettings, 'entity'> {
                return { type: 'Hints', hintName: self.entryName, hintType: 'Puzzle', disabled: !(Opts.hints && (!this.condition || this.condition.evaluate())) }
            },
        })
    }
    getDataFromEntity(e: ig.Entity): HintData {
        if (!(e instanceof ig.ENTITY.JumpPanel)) throw new Error()
        return Lang.hints.JumpPanel
    }
}
