import en_US from '../lang/en_US.json'
import fr_FR from '../lang/fr_FR.json'
// import * as de_DE from '../lang/de_DE.json'

type LangType = typeof en_US
export let Lang: LangType

const langs: Record<string, LangType> = {
    en_US: en_US,
    fr_FR: fr_FR as unknown as LangType,
    // de_DE: de_DE,
}

export class LangManager {
    constructor() {
        /* in prestart */
        Lang = langs[localStorage.getItem('IG_LANG')!] ?? en_US
    }
}
