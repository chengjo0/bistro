import * as csstips from 'csstips'
import { percent, px, rem } from 'csx'
import { graphql } from 'gatsby'
import * as React from 'react'
import { classes, keyframes, style } from 'typestyle'
import Layout from '../components/layout'

interface Props {
  data: {
    allContentfulHorairesDouverture: {
      edges: Array<{
        node: {
          openingHour: Array<{
            isOpenForLunch: Boolean
            isOpenForDinner: Boolean
            period: String
            lunchOpeningTime: String
            lunchClosingTime: String
            dinnerOpeningTime: String
            dinnerClosingTime: String
          }>
        }
      }>
    }
    allContentfulInformations: {
      edges: Array<{
        node: {
          name: String
          phone: String
          address: String
        }
      }>
    }
    allContentfulPlat: {
      edges: Array<{
        node: {
          picture: {
            fluid: {
              src: String
            }
          }
        }
      }>
    }
    contentfulAsset: {
      fluid: {
        src: String
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
          height: percent(100),
          display: 'grid',
          gridTemplateColumns: `${px(25)} auto ${px(25)}`,
          $nest: {
            '@media screen and (min-width: 500px)': {
              gridTemplateColumns: `${px(250)} auto ${px(250)}`,
            },
          },
        })}
      >
        <div
          className={style({
            ...csstips.vertical,
            ...csstips.centerCenter,
            gridColumn: '2 / 3',
            textAlign: 'justify',
            marginTop: rem(3),
            paddingBottom: rem(2),
            position: 'relative',
          })}
        >
          <div
            className={style({
              ...csstips.flex,
              ...csstips.vertical,
              ...csstips.centerCenter,
              animationName: keyframes({
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              }),
              animationDuration: '1s',
              animationTimingFunction: 'ease-in',
            })}
          ></div>
          <span
            className={style({
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
                  fontSize: rem(2),
                })
              )}
            ></i>
          </span>
        </div>
      </div>
      <div
        className={style({
          backgroundColor: 'red',
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
            isOpenForLunch
            isOpenForDinner
            lunchClosingTime
            lunchOpeningTime
            period
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
        }
      }
    }
    allContentfulPlat(filter: { node_locale: { eq: "fr" } }) {
      edges {
        node {
          description
          picture {
            fluid {
              src
            }
          }
        }
      }
    }
    contentfulAsset(title: { eq: "Hero" }) {
      fluid {
        src
      }
    }
  }
`
