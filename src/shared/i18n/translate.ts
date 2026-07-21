export type Lang = 'en' | 'ko'

export const SUPPORTED_LANGS: Lang[] = ['en', 'ko']
export const DEFAULT_LANG: Lang = 'en'

export type Dictionary = Record<Lang, Record<string, string>>

export type TranslateVars = Record<string, string | number>

/** Normalize an arbitrary stored/browser value to a supported language. */
export function resolveLang(value: string | null | undefined): Lang {
  return SUPPORTED_LANGS.includes(value as Lang) ? (value as Lang) : DEFAULT_LANG
}

function interpolate(template: string, vars?: TranslateVars): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  )
}

/**
 * Look up `key` in the active language, falling back to English, then to the
 * raw key so a missing string is visible rather than blank.
 */
export function translate(
  dict: Dictionary,
  lang: Lang,
  key: string,
  vars?: TranslateVars,
): string {
  const template = dict[lang]?.[key] ?? dict[DEFAULT_LANG]?.[key] ?? key
  return interpolate(template, vars)
}
