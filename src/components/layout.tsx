import { rem, viewHeight } from 'csx'
import * as React from 'react'
import Helmet from 'react-helmet'
import { style } from 'typestyle'
import Header from './header'

interface Props {
  children: React.ReactNode
  pageName: String
  withPadding?: Boolean
}

export default ({ pageName, withPadding = false, children }: Props) => {
  return (
    <div
      className={style({
        height: viewHeight(100),
        paddingTop: rem(withPadding ? 4 : 0),
      })}
    >
      <Helmet>
        <title>Bistro d'Asie | {String(pageName)}</title>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" />
        <script src="https://kit.fontawesome.com/e292d05fa9.js"></script>
      </Helmet>
      <Header />
      {children}
    </div>
  )
}
