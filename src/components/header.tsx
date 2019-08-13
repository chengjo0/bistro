import * as csstips from 'csstips'
import { percent, px, rem } from 'csx'
import { graphql, Link, navigate, StaticQuery } from 'gatsby'
import * as React from 'react'
import { classes, style } from 'typestyle'
import { LanguageContext } from '../context'
import * as Theme from '../theme'
import { ContextType, Language } from '../types'

interface Pages {
  fr: {
    pageList: Array<{ title: String; url: String }>
  }
  en: {
    pageList: Array<{ title: String; url: String }>
  }
}

const Header = () => {
  const [openMenu, setOpenMenu] = React.useState(false)
  return (
    <LanguageContext.Consumer>
      {({ locale: lang, setLocale }: ContextType) => {
        return (
          <StaticQuery
            query={graphql`
              query GetLinks {
                fr: contentfulPages(node_locale: { eq: "fr" }) {
                  pageList {
                    title
                    url
                  }
                }
                en: contentfulPages(node_locale: { eq: "en" }) {
                  pageList {
                    title
                    url
                  }
                }
              }
            `}
            render={(pages: Pages) => {
              const pagesForLocale = pages[lang]

              return (
                <header className={styles.headerWrapper}>
                  <div className={styles.header}>
                    <Link
                      to={lang === 'en' ? '/en/home' : '/'}
                      className={styles.brand}
                    >
                      Bistro d'Asie
                    </Link>
                    <div
                      onClick={() => {
                        setOpenMenu(!openMenu)
                      }}
                    >
                      <i
                        className={classes(
                          'fas fa-angle-down',
                          Theme.styles.toggle,
                          Theme.styles.animateToggle(openMenu)
                        )}
                      />
                    </div>
                  </div>
                  <div className={styles.menuWrapper(openMenu)}>
                    <div className={styles.menu}>
                      {pagesForLocale.pageList.map((page, index) => (
                        <Link
                          key={`link-${index}`}
                          to={String(page.url)}
                          className={styles.link}
                        >
                          <h3>{String(page.title)}</h3>
                        </Link>
                      ))}
                      <div className={styles.languageSwitcher}>
                        <div
                          onClick={() => {
                            if (setLocale && lang !== 'en') {
                              let pos = -1
                              pos = pagesForLocale.pageList.findIndex(
                                page => page.url === window.location.pathname
                              )
                              navigate(
                                pos >= 0
                                  ? String(pages['en'].pageList[pos].url)
                                  : '/en/home'
                              )
                              setLocale()
                            }
                          }}
                          className={styles.language('en', lang)}
                        >
                          EN
                        </div>
                        <div
                          onClick={() => {
                            if (setLocale && lang !== 'fr') {
                              let pos = -1
                              pos = pagesForLocale.pageList.findIndex(
                                page => page.url === window.location.pathname
                              )
                              navigate(
                                pos >= 0
                                  ? String(pages['fr'].pageList[pos].url)
                                  : '/'
                              )
                              setLocale()
                            }
                          }}
                          className={styles.language('fr', lang)}
                        >
                          FR
                        </div>
                      </div>
                    </div>
                  </div>
                </header>
              )
            }}
          />
        )
      }}
    </LanguageContext.Consumer>
  )
}

const styles = {
  brand: style({
    fontFamily: Theme.fonts.Montserrat,
    fontWeight: 600,
    fontSize: Theme.fontSizes.title,
    textTransform: 'uppercase',
    color: Theme.colors.gold.toString(),
  }),
  language: (locale: Language, currentLocale: Language) =>
    style({
      padding: rem(1),
      fontWeight: currentLocale == locale ? 700 : 500,
    }),
  languageSwitcher: style({
    ...csstips.horizontal,
    ...csstips.endJustified,
    ...csstips.horizontallySpaced(rem(1)),
    width: percent(100),
    $nest: {
      '& > div:last-child': {
        paddingRight: px(0),
      },
    },
  }),
  link: style({
    ...csstips.flex,
    ...csstips.centerCenter,
  }),
  menu: style(
    ...Theme.breakpoints({
      mobile: {
        paddingLeft: Theme.paddings.mobile,
        paddingRight: Theme.paddings.mobile,
      },
      desktop: {
        paddingLeft: Theme.paddings.desktop,
        paddingRight: Theme.paddings.desktop,
      },
    }),
    {
      ...csstips.flex,
      ...csstips.vertical,
      backgroundColor: Theme.colors.gold.fade(0.9).toString(),
      overflowY: 'hidden',
    }
  ),
  menuWrapper: (isOpen: Boolean = false) =>
    style(
      ...Theme.breakpoints({
        mobile: { top: Theme.headerHeight.mobile },
        desktop: { top: Theme.headerHeight.desktop },
      }),
      {
        maxHeight: isOpen ? percent(100) : rem(0),
        height: 'auto',
        display: 'flex',
        position: 'fixed',
        right: px(0),
        width: percent(100),
        overflowY: 'hidden',
        transition: 'max-height .5s ease',
      }
    ),
  header: style(
    ...Theme.breakpoints({
      mobile: {
        height: Theme.headerHeight.mobile,
        marginLeft: Theme.paddings.mobile,
        marginRight: Theme.paddings.mobile,
      },
      desktop: {
        height: Theme.headerHeight.desktop,
        marginLeft: Theme.paddings.desktop,
        marginRight: Theme.paddings.desktop,
      },
    }),
    {
      ...csstips.flex,
      ...csstips.betweenJustified,
      ...csstips.center,
      ...csstips.horizontal,
    }
  ),
  headerWrapper: style({
    ...csstips.flex,
    position: 'fixed',
    top: px(0),
    width: percent(100),
    background: Theme.colors.purple.fade(0.9).toString(),
    zIndex: 100,
  }),
}

export default Header
