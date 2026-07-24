import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { resolveLang, translate } from './translate'
import type { Dictionary, Lang, TranslateVars } from './translate'

const STORAGE_KEY = 'koreanlife.lang'

type I18nContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  t: (key: string, vars?: TranslateVars) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLang(): Lang {
  try {
    return resolveLang(localStorage.getItem(STORAGE_KEY))
  } catch {
    return resolveLang(null)
  }
}

type LanguageProviderProps = {
  dict: Dictionary
  children: ReactNode
}

export function LanguageProvider({ dict, children }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Lang>(() => readStoredLang())

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // storage unavailable (private mode) — keep in-memory state only
    }
  }, [])

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === 'en' ? 'ko' : 'en'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      toggle,
      t: (key, vars) => translate(dict, lang, key, vars),
    }),
    [dict, lang, setLang, toggle],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within a LanguageProvider')
  }
  return ctx
}
