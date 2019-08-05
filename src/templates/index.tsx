import * as csstips from 'csstips'
import { percent, rem } from 'csx'
import { graphql, Link } from 'gatsby'
import * as React from 'react'
import { classes, keyframes, style } from 'typestyle'
import Layout from '../components/layout'
import * as Theme from '../theme'
interface Props {
  data: {
    hero: {
      slogan: String
    }
    contentfulInformations: {
      picture: {
        fluid: {
          src: String
        }
      }
    }
    contentfulPages: {
      pageList: Array<{
        id: String
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

export default function Home({ data }: Props) {
  return (
    <Layout pageName="Welcome">
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
            height: percent(90),
            width: percent(100),
            gridTemplateRows: `auto ${percent(15)}`,
          }
        )}
      >
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
              backgroundImage: `linear-gradient(${Theme.colors.black
                .fade(0.7)
                .toString()}, ${Theme.colors.black
                .fade(0.4)
                .toString()}), url("${
                data.contentfulInformations.picture.fluid.src
              }")`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              color: 'white',
              textAlign: 'center',
              fontSize: Theme.fontSizes.textLarge,
              fontFamily: Theme.fonts.title,
              fontWeight: 500,
              lineHeight: rem(4),
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
          height: percent(50),
          ...csstips.flex,
          ...csstips.centerCenter,
          ...csstips.vertical,
        })}
      >
        {data.contentfulPages.pageList.map(page => (
          <Link key={String(page.title)} to={String(page.url)}>
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
          src
        }
      }
    }
    contentfulPages(node_locale: { eq: $locale }) {
      pageList {
        ... on ContentfulCategorie {
          id
          title
          url
        }
      }
    }
  }
`
