import * as csstips from 'csstips'
import { percent, rem } from 'csx'
import { graphql } from 'gatsby'
import * as React from 'react'
import { classes, keyframes, style } from 'typestyle'
import Layout from '../components/layout'
import { Colors } from '../theme'
interface Props {
  data: {
    contentfulInformations: {
      picture: {
        fluid: {
          src: String
        }
      }
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
        className={style({
          display: 'grid',
          height: percent(90),
          width: percent(100),
          gridTemplateColumns: `auto ${percent(50)}`,
          gridTemplateRows: `auto ${percent(15)}`,
          $nest: {
            '@media screen and (min-width: 500px)': {
              gridTemplateColumns: 'auto 40%',
            },
          },
        })}
      >
        <div
          className={style({
            ...csstips.centerCenter,
            ...csstips.vertical,
            ...csstips.verticallySpaced(rem(1)),
            gridColumn: '1/3',
            gridRow: '1/3',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("${data.contentfulInformations.picture.fluid.src}")`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            color: 'white',
            $nest: {
              '& > div:first-child': {
                paddingBottom: rem(1),
              },
              '& > div:last-child': {
                paddingTop: rem(5),
              },
              '@media screen and (min-width: 500px)': {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("${data.contentfulInformations.picture.fluid.src}")`,
              },
            },
          })}
        ></div>
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
                color: Colors.gold.toString(),
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
        })}
      >
        Comming soon...
      </div>
    </Layout>
  )
}

export const query = graphql`
  query IndexPage {
    contentfulInformations {
      picture {
        fluid {
          src
        }
      }
    }
  }
`
