import * as React from 'react'
import { px, percent } from 'csx'
import { cssRule } from 'typestyle'
import LanguageProvider from './src/context'
import * as Theme from './src/theme'

cssRule('html, body', {
  margin: 0,
  padding: 0,
  width: percent(100),
  height: percent(100),
  backgroundColor: Theme.colors.white.toString(),
})

cssRule('html', {
  fontSize: px(16),
  fontFamily: 'sans-serif',

  $nest: {
    '&.wf-montserrat-n4-active.wf-montserrat-n5-active.wf-montserrat-n6-active': {
      fontFamily: 'Montserrat, sans-serif',
    },

    [`@media only screen and (max-width: 1367px)`]: {
      fontSize: px(14),
    },
  },
})

cssRule('a', {
  textDecoration: 'none',
  color: Theme.colors.purple.toString(),
})

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>{element}</LanguageProvider>
)
