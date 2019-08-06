import * as csstips from 'csstips'
import { graphql, Link, navigate, StaticQuery } from 'gatsby'
import { percent, px, rem } from 'csx'
import * as React from 'react'
import { classes, style } from 'typestyle'
import { LanguageContext } from '../context'
import { ContextType, Language } from '../types'
import * as Theme from '../theme'

interface Pages {
  fr: {
    pageList: Array<{ title: String; url: String; inHeader?: Boolean }>
  }
  en: {
    pageList: Array<{ title: String; url: String; inHeader?: Boolean }>
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
                fr: contentfulPages(
                  node_locale: { eq: "fr" }
                  contentful_id: { eq: "73n7B0VXfnqMguKQR1bK51" }
                ) {
                  pageList {
                    ... on ContentfulCategorie {
                      id
                      url
                    }
                    ... on ContentfulPage {
                      id
                      title
                      url
                      inHeader
                    }
                  }
                }
                en: contentfulPages(
                  node_locale: { eq: "en" }
                  contentful_id: { eq: "73n7B0VXfnqMguKQR1bK51" }
                ) {
                  pageList {
                    ... on ContentfulCategorie {
                      id
                      url
                    }
                    ... on ContentfulPage {
                      id
                      title
                      url
                      inHeader
                    }
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
                      {pagesForLocale.pageList.map((page, index) => {
                        if (page.inHeader) {
                          return (
                            <Link
                              key={`link-${index}`}
                              to={String(page.url)}
                              className={styles.link}
                            >
                              <h3>{String(page.title)}</h3>
                            </Link>
                          )
                        }
                      })}
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
        height: isOpen ? rem(25) : rem(0),
        display: 'flex',
        position: 'fixed',
        right: px(0),
        width: percent(100),
        overflowY: 'hidden',
        transition: 'height .5s ease',
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
