import { percent, rem, viewHeight } from 'csx'
import * as React from 'react'
import Helmet from 'react-helmet'
import { style } from 'typestyle'
import * as Theme from '../theme'
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
        minHeight: viewHeight(100),
        display: 'flex',
      })}
    >
      <Helmet>
        <title>Bistro d'Asie | {String(pageName)}</title>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="//fonts.googleapis.com" />
        <script src="https://kit.fontawesome.com/e292d05fa9.js"></script>
      </Helmet>
      <Header />
      <div
        className={style(
          ...Theme.breakpoints({
            mobile: {
              marginTop: withPadding ? Theme.headerHeight.mobile : rem(0),
            },
            desktop: {
              paddingTop: withPadding ? Theme.headerHeight.desktop : rem(0),
            },
          }),
          {
            width: percent(100),
          }
        )}
      >
        {children}
      </div>
    </div>
  )
}
