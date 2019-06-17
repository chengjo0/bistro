import * as csstips from 'csstips'
import { percent, px, rem } from 'csx'
import { Link } from 'gatsby'
import * as React from 'react'
import { style } from 'typestyle'
import * as Theme from '../theme'

// const opacityOffsetLimit = window.innerWidth
const opacityOffsetLimit = (3 * window.innerHeight) / 4

const maxWidth = 960

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
    <h3>Menu</h3>
  </Link>,
]

const Header = () => {
  const [headerOpacity, setHeaderOpacity] = React.useState(0)
  const [openMenu, setOpenMenu] = React.useState(false)

  const scrollListener = () => {
    setHeaderOpacity(window.pageYOffset / opacityOffsetLimit)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollListener)

    return function cleanup() {
      window.removeEventListener('scroll', scrollListener)
    }
  })

  return (
    <header
      className={style({
        position: 'fixed',
        top: px(0),
        height: rem(6),
        width: percent(100),
        background: Theme.Colors.purple.fade(headerOpacity).toString(),
      })}
    >
      {window.innerWidth > maxWidth ? null : (
        <div
          className={style({
            ...csstips.vertical,
            ...csstips.centerCenter,
            position: 'absolute',
            top: px(0),
            background: Theme.Colors.purple.fade(0.8).toString(),
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
          ...csstips.margin(
            rem(0),
            rem(window.innerWidth <= maxWidth ? 1 : 16)
          ),
          ...csstips.horizontal,
          ...csstips.center,
          ...csstips.betweenJustified,
          height: percent(100),
          $nest: {
            a: {
              textDecoration: 'none',
            },
            'a h3': {
              marginBottom: rem(0),
            },
          },
        })}
      >
        <Link to="/">
          <div
            className={style({
              background: Theme.Colors.purple
                .fade(1 - headerOpacity)
                .toString(),
              ...csstips.padding(rem(1), rem(1.5)),
              borderRadius: rem(2.5),
              color: Theme.Colors.gold.toString(),
              $nest: {
                h2: {
                  marginBottom: rem(0),
                },
              },
            })}
          >
            <h2>Bistro d'Asie</h2>
          </div>
        </Link>
        <div
          className={style({
            ...csstips.horizontal,
            ...csstips.horizontallySpaced(rem(2)),
            $nest: {
              a: {
                ...csstips.centerCenter,
                background: Theme.Colors.purple
                  .fade(1 - headerOpacity)
                  .toString(),
                ...csstips.padding(rem(1), rem(1.5)),
                borderRadius: rem(2.5),
                color: Theme.Colors.gold.toString(),
                minWidth: rem(8),
                $nest: {
                  h3: {
                    marginBottom: rem(0),
                  },
                },
              },
            },
          })}
        >
          {window.innerWidth <= maxWidth ? (
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
          ) : (
            childrenNodes.map(node => node)
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
