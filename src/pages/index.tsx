import * as csstips from 'csstips'
import { percent, px, rem, rotate, deg } from 'csx'
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
          ...csstips.padding(rem(4), px(5), rem(2), px(5)),
          display: 'flex',
          height: percent(70),
          $nest: {
            '@media screen and (min-width: 500px)': {
              height: percent(80),
            },
          },
          position: 'relative',
          overflowX: 'hidden',
        })}
      >
        <img
          src="chinese.png"
          alt="chinese"
          className={style({
            position: 'absolute',
            right: rem(-5),
            top: rem(6),
            height: percent(50),
            animationName: keyframes({
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            }),
            animationDuration: '1s',
            animationTimingFunction: 'ease-in',
            $nest: {
              '@media screen and (min-width: 500px)': {
                top: rem(8),
              },
            },
          })}
        />
        <div
          className={style({
            ...csstips.flex,
            ...csstips.centerCenter,
            ...csstips.vertical,
          })}
        >
          <div
            className={style({
              ...csstips.content,
              ...csstips.vertical,
              animationName: keyframes({
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
              }),
              animationDuration: '2s',
              animationTimingFunction: 'ease-in',
              backgroundColor: 'pink',
            })}
          >
            <div>Horaires:</div>
            <div>Horaires:</div>
            <div>Horaires:</div>
            <div>Horaires:</div>
          </div>
          <span
            className={style({
              ...csstips.end,
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
