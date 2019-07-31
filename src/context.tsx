import React from 'react'

interface Props {
  children: React.ReactNode
}

type ContextType = {
  lang: 'fr' | 'en'
  setLanguage?: () => void
}

const defaultState: ContextType = {
  lang: 'fr',
}
const LanguageContext = React.createContext<ContextType>(defaultState)

export default function({ children }: Props) {
  const [lang, setLanguage] = React.useState('fr')

  return (
    <LanguageContext.Provider
      value={{
        lang: lang as 'fr' | 'en',
        setLanguage: () => setLanguage(lang == 'fr' ? 'en' : 'fr'),
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, ContextType }
