import * as csstips from 'csstips'
import { deg, percent, px, rem, rotateX } from 'csx'
import { Link } from 'gatsby'
import * as React from 'react'
import { classes, style } from 'typestyle'
import * as Theme from '../theme'
import { LanguageContext, ContextType } from '../context'

const childrenNodes = [
  <Link to="/">
    <h3>Home</h3>
  </Link>,
  <Link to="/menu/">
    <h3>Menu</h3>
  </Link>,
  <Link to="/about/">
    <h3>About</h3>
  </Link>,
  <Link to="/contacts/">
    <h3>Contacts</h3>
  </Link>,
]

const Header = () => {
  const [openMenu, setOpenMenu] = React.useState(false)

  return (
    <LanguageContext.Consumer>
      {({ lang, setLanguage }: ContextType) => {
        return (
          <header
            className={style({
              ...csstips.flex,
              position: 'fixed',
              top: px(0),
              width: percent(100),
              background: Theme.Colors.purple.fade(0.9).toString(),
              zIndex: 100,
            })}
          >
            <div
              className={style({
                ...csstips.flex,
                ...csstips.betweenJustified,
                ...csstips.center,
                ...csstips.horizontal,
                height: rem(4),
                marginLeft: px(25),
                marginRight: px(25),
                $nest: {
                  '@media screen and (min-width: 500px)': {
                    height: rem(6),
                    marginLeft: px(250),
                    marginRight: px(250),
                  },
                },
              })}
            >
              <Link
                to="/"
                className={style({
                  textDecoration: 'none',
                  color: Theme.Colors.gold.toString(),
                  fontFamily: 'Montserrat',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                })}
              >
                <span>Bistro d'Asie</span>
              </Link>
              <div
                onClick={() => {
                  setOpenMenu(!openMenu)
                }}
              >
                <i
                  className={classes(
                    'fas fa-angle-down',
                    style({
                      padding: `${rem(1)} ${rem(0)} ${rem(1)} ${rem(1)}`,
                      fontSize: rem(1.5),
                      color: Theme.Colors.gold.toString(),
                      transform: rotateX(deg(openMenu ? 180 : 0)),
                      transition: 'transform .5s ease',
                    })
                  )}
                ></i>
              </div>
            </div>
            <div
              className={style({
                height: openMenu ? rem(20) : rem(0),
                display: 'flex',
                position: 'fixed',
                top: rem(4),
                right: px(0),
                width: percent(100),
                overflowY: 'hidden',
                transition: 'height .5s ease',
                $nest: {
                  '@media screen and (min-width: 500px)': {
                    top: rem(6),
                  },
                },
              })}
            >
              <div
                className={style({
                  ...csstips.flex,
                  ...csstips.vertical,
                  ...csstips.centerCenter,
                  ...csstips.aroundJustified,
                  backgroundColor: Theme.Colors.gold.fade(0.9).toString(),
                  overflowY: 'hidden',
                })}
              >
                {childrenNodes.map((node, index) => (
                  <div key={`link-${index}`}>{node}</div>
                ))}
                <div
                  className={style({
                    ...csstips.horizontal,
                    ...csstips.endJustified,
                    ...csstips.horizontallySpaced(rem(1)),
                    ...csstips.padding(rem(0), rem(3), rem(0), rem(0)),
                    width: percent(100),
                  })}
                >
                  <div
                    onClick={setLanguage}
                    className={style({
                      fontWeight: lang == 'en' ? 700 : 500,
                    })}
                  >
                    EN
                  </div>
                  <div
                    onClick={setLanguage}
                    className={style({
                      fontWeight: lang == 'fr' ? 700 : 500,
                    })}
                  >
                    FR
                  </div>
                </div>
              </div>
            </div>
          </header>
        )
      }}
    </LanguageContext.Consumer>
  )
}

export default Header
