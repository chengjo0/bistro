import * as csstips from 'csstips'
import { percent, rem, px } from 'csx'
import { graphql, Link } from 'gatsby'
import * as React from 'react'
import { classes, keyframes, style } from 'typestyle'
import Layout from '../components/layout'
import * as Theme from '../theme'
interface Props {
  pageContext: {
    pageName: 'Accueil' | 'Home'
  }
  data: {
    hero: {
      slogan: String
    }
    contentfulInformations: {
      picture: {
        fluid: {
          srcSet: String
        }
      }
    }
    contentfulPages: {
      pageList: Array<{
        title: String
        url: String
      }>
    }
  }
}

const pulse = keyframes({
  '0%': { opacity: 0 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0 },
})

export default function Home({ data, pageContext }: Props) {
  return (
    <Layout pageName={pageContext.pageName}>
      <div
        className={style(
          ...Theme.breakpoints({
            mobile: {
              gridTemplateColumns: `auto ${percent(50)}`,
            },
            desktop: {
              gridTemplateColumns: 'auto 40%',
            },
          }),
          {
            display: 'grid',
            height: percent(65),
            width: percent(100),
            gridTemplateRows: `auto ${percent(15)}`,
          }
        )}
      >
        <img
          srcSet={String(data.contentfulInformations.picture.fluid.srcSet)}
          alt="image"
          className={style(
            ...Theme.breakpoints({
              mobile: {
                width: percent(100),
              },
              desktop: {},
            }),
            {
              gridColumn: '1/3',
              gridRow: '1/3',
              height: percent(100),
              filter: `brightness(${percent(50)})`,
            }
          )}
        />
        <div
          className={style(
            ...Theme.breakpoints({
              mobile: {
                padding: Theme.paddings.mobile,
              },
              desktop: {
                padding: Theme.paddings.desktop,
              },
            }),
            {
              ...csstips.centerCenter,
              ...csstips.vertical,
              gridColumn: '1/3',
              gridRow: '1/3',
              color: 'white',
              textAlign: 'center',
              fontSize: Theme.fontSizes.textLarge,
              fontFamily: Theme.fonts.title,
              fontWeight: 500,
              lineHeight: rem(4),
              position: 'relative',
              $nest: {
                '& > div:first-child': {
                  paddingBottom: rem(1),
                },
                '& > div:last-child': {
                  paddingTop: rem(5),
                },
              },
            }
          )}
        >
          {data.hero.slogan}
        </div>
        <div
          className={style({
            ...csstips.centerCenter,
            gridColumn: '1/3',
            gridRow: '2/3',
            animationName: pulse,
            animationDuration: '3s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in',
          })}
        >
          <i
            className={classes(
              'fas fa-angle-double-down',
              style({
                fontSize: rem(3),
                color: Theme.colors.gold.toString(),
              })
            )}
          ></i>
        </div>
      </div>
      <div
        className={style({
          padding: Theme.paddings.mobile,
          ...csstips.flex,
          ...csstips.vertical,
          ...csstips.verticallySpaced(rem(1)),
        })}
      >
        {data.contentfulPages.pageList.map(page => (
          <Link
            key={String(page.title)}
            to={String(page.url)}
            className={style({
              ...csstips.centerCenter,
              ...csstips.padding(rem(2)),
              borderWidth: px(1),
              borderRadius: rem(0.3),
              backgroundColor: Theme.colors.gold.toString(),
              fontFamily: Theme.fonts.title,
            })}
          >
            {page.title}
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query IndexPage($locale: String) {
    hero: contentfulInformations(node_locale: { eq: $locale }) {
      slogan
    }
    contentfulInformations {
      picture {
        fluid {
          srcSet
        }
      }
    }
    contentfulPages(node_locale: { eq: $locale }) {
      pageList {
        title
        url
      }
    }
  }
`
