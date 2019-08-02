export type Language = 'fr' | 'en'

export type ContextType = {
  lang: Language
  setLanguage?: () => void
}
