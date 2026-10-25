import { createContext, useContext } from 'react'
import type { Lang } from '../data/deals'

export type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  dir: 'ltr' | 'rtl'
}

export const LangContext = createContext<LangContextValue>({
  lang: 'en',
  setLang: () => undefined,
  dir: 'ltr',
})

export const useLang = () => useContext(LangContext)

export const pick = <T,>(value: { en: T; ar: T }, lang: Lang): T => value[lang]
