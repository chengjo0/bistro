import * as csstips from 'csstips'
import { color, percent, px, rem, scale } from 'csx'
import { Link } from 'gatsby'
import * as React from 'react'
import { style } from 'typestyle'

const bg = color('rgb(255, 255, 24)')

const opacityOffsetLimit = window.innerHeight / 2

const childrenNodes = [
  <Link to="/" className="link">
    <h3>Home</h3>
  </Link>,
  <Link to="/about/">
    <h3>About</h3>
  </Link>,
  <Link to="/contact/">
    <h3>Contact</h3>
  </Link>,
  <Link to="/contact/">
    <h3>Contact2</h3>
  </Link>,
  <Link to="/contact/">
    <h3>Contact3</h3>
  </Link>,
  <Link to="/contact/">
    <h3>Contact4</h3>
  </Link>,
]

const Header = () => {
  const [headerOpacity, setHeaderOpacity] = React.useState(0)
  const [openMenu, setOpenMenu] = React.useState(false)

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      setHeaderOpacity(window.pageYOffset / opacityOffsetLimit)
    })
  })

  return (
    <header
      className={style({
        position: 'fixed',
        top: px(0),
        height: rem(6),
        width: percent(100),
        background: bg.fade(headerOpacity).toString(),
      })}
    >
      {window.innerWidth > 500 ? null : (
        <div
          className={style({
            ...csstips.vertical,
            ...csstips.centerCenter,
            position: 'absolute',
            top: px(0),
            background: color('rgb(0, 0, 0)')
              .fade(0.8)
              .toString(),
            width: percent(100),
            height: openMenu ? window.innerHeight : 0,
            transition: 'height .2s ease-in',
            overflowY: 'hidden',
            $nest: {
              a: {
                color: 'white',
              },
            },
          })}
          onClick={() => {
            setOpenMenu(!openMenu)
          }}
        >
          {childrenNodes.map(node => node)}
        </div>
      )}
      <div
        className={style({
          ...csstips.margin(rem(0), rem(window.innerWidth < 500 ? 1 : 16)),
          ...csstips.horizontal,
          ...csstips.center,
          ...csstips.betweenJustified,
          height: percent(100),
        })}
      >
        <Link to="/">
          <h3>Bistro d'Asie</h3>
        </Link>
        <div
          className={style({
            ...csstips.horizontal,
            ...csstips.horizontallySpaced(rem(2)),
          })}
        >
          {window.innerWidth < 500 ? null : childrenNodes.map(node => node)}
          <div
            className={style({
              ...csstips.centerCenter,
              backgroundColor: 'red',
              height: rem(2),
              width: rem(2),
              borderRadius: percent(50),
            })}
            onClick={() => {
              setOpenMenu(!openMenu)
            }}
          >
            x
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
