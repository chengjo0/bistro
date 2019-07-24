import { percent, px, viewHeight } from 'csx'
import * as React from 'react'
import { style } from 'typestyle'
import Header from './header'

interface Props {
  children: React.ReactNode
}

export default (props: Props) => {
  return (
    <div
      className={style({
        height: viewHeight(100),
        width: percent(100),
      })}
    >
      <Header />
      <div
        className={style({
          height: percent(100),
          display: 'grid',
          gridTemplateColumns: `${px(25)} auto ${px(25)}`,
          $nest: {
            '@media screen and (min-width: 500px)': {
              gridTemplateColumns: `${px(250)} auto ${px(250)}`,
            },
          },
        })}
      >
        {props.children}
      </div>
    </div>
  )
}
