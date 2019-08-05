import React from 'react'
import { ContextType, Language } from './types'

interface Props {
  children: React.ReactNode
}

const defaultState: ContextType = {
  locale: 'fr',
}

const LanguageContext = React.createContext<ContextType>(defaultState)

export default function({ children }: Props) {
  const isVisitingEnglishPage = window.location.pathname.indexOf('en') >= 0

  const [locale, setLocale] = React.useState<Language>(
    isVisitingEnglishPage ? 'en' : 'fr'
  )

  return (
    <LanguageContext.Provider
      value={{
        locale: locale,
        setLocale: () => {
          const newSessionLocale = locale == 'fr' ? 'en' : 'fr'
          setLocale(newSessionLocale)
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, ContextType }
