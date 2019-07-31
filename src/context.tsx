import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

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

  useEffect(() => {
    const lang = sessionStorage.getItem('lang') as 'en' | 'fr' | undefined
    if (lang) {
      setLanguage(lang)
      if (lang === 'en' && window.location.pathname.indexOf('en') < 0) {
        navigate(`/en${window.location.pathname}`)
      }
    } else {
      sessionStorage.setItem('lang', 'fr')
    }
  })

  return (
    <LanguageContext.Provider
      value={{
        lang: lang as 'fr' | 'en',
        setLanguage: () => {
          sessionStorage.setItem('lang', lang == 'fr' ? 'en' : 'fr')
          setLanguage(lang == 'fr' ? 'en' : 'fr')
        },
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export { LanguageContext, ContextType }
