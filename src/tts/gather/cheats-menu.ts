import { Lang } from '../../lang-manager'
import { Opts } from '../../options'
import { speakIC } from './api'

/* sc.CheatsMenu is defined by the third-party "cheats" mod (ZeikJT/CrossCodeCheats), not by
 * base CrossCode or CrossedEyes. Its rows are a sc.CheckboxGui or a slider (a subclass of the
 * base game's sc.OptionFocusSlider) sitting next to a *separate* Label GUI -- the control itself
 * carries no text, so nothing announced it. This file wires each control's crossedeyesLabel
 * (already read by the existing generic sc.CheckboxGui hook, see checkbox.ts) and adds an
 * equivalent generic hook for sc.OptionFocusSlider, which had none before.
 *
 * Must run after the cheats mod's postload script has actually defined sc.CheatsMenu, i.e. in
 * poststart(), not prestart() -- see plugin.ts.
 */
declare global {
    namespace sc {
        /* ig.ENTITY.JumpPanel-style local augmentation: sc.CheatsMenu isn't part of ultimate-crosscode-typedefs at all,
         * since it's defined at runtime by the third-party "cheats" mod, not the base game. */
        interface CheatsMenu extends sc.BaseMenu {
            cheats: Map<string, sc.CheckboxGui | sc.OptionFocusSlider>
            labels: Map<string, sc.TextGui>
        }
        interface CheatsMenuConstructor extends ImpactClass<CheatsMenu> {
            new (): CheatsMenu
        }
        var CheatsMenu: CheatsMenuConstructor | undefined

        interface OptionFocusSlider {
            crossedeyesLabel?: string
        }
    }
}

sc.OptionFocusSlider.inject({
    focusGained() {
        this.parent()
        if (Opts.tts && this.crossedeyesLabel?.trim()) {
            speakIC(`${Lang.menu.options.slider}: ${this.crossedeyesLabel.trim()}, ${this.getValue()}`)
        }
    },
    setValue(value) {
        this.parent(value)
        /* only announce user-driven changes (this.focus), not the initial value set during row construction */
        if (Opts.tts && this.focus && this.crossedeyesLabel?.trim()) {
            speakIC(`${this.getValue()}`)
        }
    },
})

sc.CheatsMenu?.inject({
    init() {
        this.parent()
        for (const [cheat, control] of this.cheats) {
            const label = this.labels.get(cheat)?.text?.toString().trim()
            if (!label) continue
            control.crossedeyesLabel = label
        }
    },
})
