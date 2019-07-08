import { px, rem } from 'csx'
import * as React from 'react'
import { style } from 'typestyle'
import Header from './header'

interface Props {
  children: React.ReactNode
}

export default (props: Props) => (
  <div>
    <Header />
    <div
      className={style({
        display: 'grid',
        gridTemplateColumns: `${px(25)} auto ${px(25)}`,
        paddingTop: rem(3),
        $nest: {
          '@media screen and (min-width: 500px)': {
            gridTemplateColumns: `${px(250)} auto ${px(250)}`,
            paddingTop: rem(6),
          },
        },
      })}
    >
      {props.children}
    </div>
  </div>
)
