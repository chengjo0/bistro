import React from 'react'
import { ContextType, Language } from './types'

interface Props {
  children: React.ReactNode
}

const defaultState: ContextType = {
  lang: 'fr',
}

const LanguageContext = React.createContext<ContextType>(defaultState)

export default function({ children }: Props) {
  const isVisitingEnglishPage = window.location.pathname.indexOf('en') >= 0

  const [lang, setLanguage] = React.useState<Language>(
    isVisitingEnglishPage ? 'en' : 'fr'
  )

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLanguage: () => {
          const newSessionLocale = lang == 'fr' ? 'en' : 'fr'
          setLanguage(newSessionLocale)
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, ContextType }
