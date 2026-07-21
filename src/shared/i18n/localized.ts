import { DEFAULT_LANG } from './translate'
import type { Lang } from './translate'

/** A piece of content authored in both supported languages. */
export type Localized = Record<Lang, string>

/** Select the active-language string, falling back to English if empty. */
export function pick(value: Localized, lang: Lang): string {
  return value[lang]?.trim() ? value[lang] : value[DEFAULT_LANG]
}
