import * as React from 'react'
import { style } from 'typestyle'
import { rem, px, percent, color } from 'csx'
import { Link } from 'gatsby'
import * as csstips from 'csstips'

const bg = color('rgb(255, 255, 24)')

const Header = () => {
  const [headerOpacity, setHeaderOpacity] = React.useState(0)

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      setHeaderOpacity(window.pageYOffset / 300)
    })
  })

  return (
    <header
      className={style({
        background: bg.fade(headerOpacity).toString(),
        height: rem(6),
        position: 'fixed',
        top: px(0),
        width: percent(100),
      })}
    >
      <div
        className={style({
          ...csstips.horizontal,
          ...csstips.center,
          ...csstips.betweenJustified,
          ...csstips.padding(rem(0), rem(16)),
          height: rem(5),
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
          <Link to="/">
            <h3>Home</h3>
          </Link>
          <Link to="/about/">
            <h3>About</h3>
          </Link>
          <Link to="/contact/">
            <h3>Contact</h3>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
