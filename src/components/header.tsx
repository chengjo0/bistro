import * as csstips from 'csstips'
import { percent, px, rem } from 'csx'
import { graphql, Link, navigate, StaticQuery } from 'gatsby'
import * as React from 'react'
import { classes, style } from 'typestyle'
import { ContextType, LanguageContext } from '../context'
import * as Theme from '../theme'

type NodeType = {
  node: {
    page: Array<{
      title: String
      linkTo: String
    }>
    node_locale: 'en' | 'fr'
  }
}

interface LinkType {
  allContentfulListeDePages: {
    edges: Array<NodeType>
  }
}

const Header = () => {
  const [openMenu, setOpenMenu] = React.useState(false)
  return (
    <LanguageContext.Consumer>
      {({ lang, setLanguage }: ContextType) => {
        return (
          <StaticQuery
            query={graphql`
              query GetPages {
                allContentfulListeDePages {
                  edges {
                    node {
                      page {
                        title
                        linkTo
                      }
                      node_locale
                    }
                  }
                }
              }
            `}
            render={(data: LinkType) => {
              const links = data.allContentfulListeDePages.edges.find(
                edge => edge.node.node_locale === lang
              )

              if (!links) {
                return
              }

              return (
                <header className={styles.headerWrapper}>
                  <div className={styles.header}>
                    <Link
                      to={String(
                        links.node.page.reduce((acc, val) => {
                          return val.title === 'Home' || val.title === 'Accueil'
                            ? val
                            : acc
                        }).linkTo
                      )}
                      className={Theme.styles.brand}
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
                      {links.node.page.map((node, index) => (
                        <Link
                          key={`link-${index}`}
                          to={String(node.linkTo)}
                          className={styles.link}
                        >
                          <h3>{String(node.title)}</h3>
                        </Link>
                      ))}
                      <div className={styles.languageSwitcher}>
                        <div
                          onClick={() => {
                            if (setLanguage && lang !== 'en') {
                              navigate(`/en/${window.location.pathname}`)
                              setLanguage()
                            }
                          }}
                          className={styles.language('en', lang)}
                        >
                          EN
                        </div>
                        <div
                          onClick={() => {
                            if (setLanguage && lang !== 'fr') {
                              navigate(
                                `${window.location.pathname
                                  .split('')
                                  .slice(3)
                                  .join('')}`
                              )
                              setLanguage()
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
  language: (selectedLang: 'fr' | 'en', lang: 'fr' | 'en') =>
    style({
      padding: rem(1),
      fontWeight: lang == selectedLang ? 700 : 500,
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
        height: isOpen ? rem(20) : rem(0),
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
