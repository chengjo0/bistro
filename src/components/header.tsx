import * as csstips from 'csstips'
import { percent, px, rem } from 'csx'
import { Link } from 'gatsby'
import * as React from 'react'
import { style } from 'typestyle'
import * as Theme from '../theme'

const childrenNodes = [
  <Link to="/">
    <h3>Bistro d'Asie</h3>
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
        height: rem(4),
        width: percent(100),
        background: Theme.Colors.purple.fade(0.9).toString(),
        paddingLeft: px(25),
        paddingRight: px(25),
        $nest: {
          '@media screen and (min-width: 500px)': {
            height: rem(6),
            paddingLeft: px(250),
            paddingRight: px(250),
          },
        },
      })}
    >
      <Link
        to="/"
        className={style({
          textDecoration: 'none',
          color: Theme.Colors.gold.toString(),
        })}
      >
        <span>Bistro d'Asie</span>
      </Link>
    </header>
  )
}

export default Header
