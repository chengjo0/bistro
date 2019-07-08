import * as csstips from 'csstips'
import { percent, px, rem } from 'csx'
import { Link } from 'gatsby'
import * as React from 'react'
import { style } from 'typestyle'
import * as Theme from '../theme'

const childrenNodes = [
  <Link to="/">
    <h3>Home</h3>
  </Link>,
  <Link to="/about/">
    <h3>About</h3>
  </Link>,
  <Link to="/contact/">
    <h3>Contact</h3>
  </Link>,
  <Link to="/contact/">
    <h3>Menu</h3>
  </Link>,
]

const Header = () => {
  return (
    <header
      className={style({
        ...csstips.betweenJustified,
        ...csstips.center,
        ...csstips.horizontal,
        position: 'fixed',
        top: px(0),
        height: rem(6),
        width: percent(100),
        background: Theme.Colors.purple.fade(0.9).toString(),
        paddingLeft: px(250),
        paddingRight: px(250),
      })}
    >
      {childrenNodes.map(node => node)}
    </header>
  )
}

export default Header
