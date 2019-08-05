export type Language = 'fr' | 'en'

export type ContextType = {
  locale: Language
  setLocale?: () => void
}
