import * as csstips from 'csstips'
import { percent, rem } from 'csx'
import { graphql } from 'gatsby'
import * as React from 'react'
import { classes, keyframes, style } from 'typestyle'
import Layout from '../components/layout'
import { Colors } from '../theme'

type OpeningHour = {
  period: String
  lunchOpeningTime: String
  lunchClosingTime: String
  dinnerOpeningTime: String
  dinnerClosingTime: String
  openingType: 'Fermé' | 'Midi seulement' | 'Midi et soir'
}

interface Props {
  data: {
    allContentfulHorairesDouverture: {
      edges: Array<{
        node: {
          openingHour: Array<OpeningHour>
        }
      }>
    }
    allContentfulInformations: {
      edges: Array<{
        node: {
          name: String
          phone: String
          address: String
          hero: Array<{
            description: 'mobile' | 'browser'
            fluid: {
              src: String
            }
          }>
        }
      }>
    }
  }
}

const pulse = keyframes({
  '0%': { opacity: 0 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const getOpeningHours = (openingHour: OpeningHour) => {
  let str = ''
  switch (openingHour.openingType) {
    case 'Fermé':
      str = openingHour.openingType
      break
    case 'Midi et soir':
      str = `${openingHour.lunchOpeningTime} - ${openingHour.lunchClosingTime} / ${openingHour.dinnerOpeningTime} - ${openingHour.dinnerClosingTime}`
      break
    case 'Midi seulement':
      str = `${openingHour.lunchOpeningTime} - ${openingHour.lunchClosingTime}`
      break
    default:
      break
  }

  return <div>{str}</div>
}

export default function Home({ data }: Props) {
  return (
    <Layout pageName="Welcome">
      <div
        className={style({
          display: 'grid',
          height: percent(90),
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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${
              data.allContentfulInformations.edges[0].node.hero.filter(
                img => img.description === 'mobile'
              )[0].fluid.src
            }")`,
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
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${
                  data.allContentfulInformations.edges[0].node.hero.filter(
                    img => img.description === 'browser'
                  )[0].fluid.src
                }")`,
              },
            },
          })}
        >
          <div>Horaires :</div>
          {data.allContentfulHorairesDouverture.edges[0].node.openingHour.map(
            openingHour => (
              <div
                key={`${openingHour.period}`}
                className={style({
                  ...csstips.horizontal,
                  $nest: {
                    '& > div:first-child': {
                      paddingRight: rem(1),
                    },
                  },
                })}
              >
                <div>{openingHour.period} :</div>
                {getOpeningHours(openingHour)}
              </div>
            )
          )}
          <div
            className={style({
              ...csstips.centerCenter,
              ...csstips.vertical,
              ...csstips.verticallySpaced(rem(1)),
              $nest: {
                '& > a': {
                  textDecoration: 'none',
                  color: 'white',
                },
              },
            })}
          >
            <a
              href={`geo://?q=${data.allContentfulInformations.edges[0].node.address}`}
            >
              {data.allContentfulInformations.edges[0].node.address}
            </a>
            <a
              href={`tel:${data.allContentfulInformations.edges[0].node.phone}`}
            >
              {data.allContentfulInformations.edges[0].node.phone}
            </a>
          </div>
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
                color: Colors.gold.toString(),
              })
            )}
          ></i>
        </div>
      </div>
      <div
        className={style({
          height: percent(100),
        })}
      >
        and then...
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allContentfulHorairesDouverture(filter: { node_locale: { eq: "fr" } }) {
      edges {
        node {
          openingHour {
            dinnerClosingTime
            dinnerOpeningTime
            lunchClosingTime
            lunchOpeningTime
            period
            openingType
          }
        }
      }
    }
    allContentfulInformations(filter: { node_locale: { eq: "fr" } }) {
      edges {
        node {
          address
          name
          phone
          hero {
            fluid {
              src
            }
            description
          }
        }
      }
    }
  }
`
