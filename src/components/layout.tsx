import { percent, viewHeight } from 'csx'
import * as React from 'react'
import { style } from 'typestyle'
import Header from './header'
import Helmet from 'react-helmet'

interface Props {
  children: React.ReactNode
  pageName: String
}

export default (props: Props) => {
  return (
    <div
      className={style({
        height: viewHeight(100),
        width: percent(100),
      })}
    >
      <Helmet>
        <title>Bistro d'Asie | {String(props.pageName)}</title>
        <script src="https://kit.fontawesome.com/e292d05fa9.js"></script>
      </Helmet>
      <Header />
      {props.children}
    </div>
  )
}
