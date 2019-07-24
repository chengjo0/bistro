import * as csstips from 'csstips'
import { deg, px, rem, rotate } from 'csx'
import { graphql } from 'gatsby'
import * as React from 'react'
import Helmet from 'react-helmet'
import { keyframes, style } from 'typestyle'
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
    <Layout>
      <Helmet>
        <title>
          {data.allContentfulInformations.edges[0].node.name} | Welcome
        </title>
        <link rel="stylesheet" href="animate.min.css"></link>
      </Helmet>
      <div
        className={style({
          ...csstips.vertical,
          ...csstips.centerCenter,
          gridColumn: '2 / 3',
          textAlign: 'justify',
          marginTop: rem(3),
          paddingBottom: rem(2),
        })}
      >
        <div
          className={style({
            ...csstips.flex,
            ...csstips.centerCenter,
            animationName: keyframes({
              '0%': { opacity: 0 },
              '100%': { opacity: 1 },
            }),
            animationDuration: '1s',
            animationTimingFunction: 'ease-in',
          })}
        >
          Welcome
        </div>
        <span
          className={style({
            animationName: pulse,
            animationDuration: '3s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in',
            position: 'relative',
            $nest: {
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: rem(-2),
                left: rem(-1.1),
                height: rem(3),
                width: px(3),
                borderRadius: px(2),
                backgroundColor: 'black',
                transform: rotate(deg(-45)),
              },
              '&::after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: rem(-2),
                right: rem(-1.1),
                height: rem(3),
                width: px(3),
                borderRadius: px(2),
                backgroundColor: 'black',
                transform: rotate(deg(45)),
              },
            },
          })}
        ></span>
      </div>
      <div
        className={style({
          gridColumn: '2 / 3',
          backgroundColor: 'red',
        })}
      >
        and then...
      </div>
      {/* <img
        src={String(data.contentfulAsset.fluid.src)}
        alt="hero"
        className={style({
          gridColumn: '1 / 4',
          maxHeight: rem(50),
          width: percent(100),
        })}
      />
      <div
        className={style({
          gridColumn: '2 / 3',
          gridRowStart: '2',
          textAlign: 'justify',
          paddingBottom: rem(2),
          ...csstips.verticallySpaced(rem(2)),
        })}
      >
        <div
          className={style({
            ...csstips.vertical,
            $nest: {
              '&>h1': {
                marginBottom: rem(1),
              },
              '&>div>span': {
                fontWeight: 'bold',
              },
              '&>div:last-child': {
                paddingTop: rem(0.5),
              },
            },
          })}
        >
          <h1>Horaires:</h1>
          {data.allContentfulHorairesDouverture.edges[0].node.openingHour.map(
            openingHours => (
              <div key={String(openingHours.period)}>
                <span>{openingHours.period}: </span>
                {openingHours.isOpenForLunch
                  ? `${openingHours.lunchOpeningTime} - ${
                      openingHours.lunchClosingTime
                    } ${
                      openingHours.isOpenForDinner
                        ? ` / ${openingHours.dinnerOpeningTime} - ${openingHours.dinnerClosingTime}`
                        : ''
                    }`
                  : `fermé`}
              </div>
            )
          )}
          <div>
            <div>{data.allContentfulInformations.edges[0].node.phone}</div>
            <div>{data.allContentfulInformations.edges[0].node.address}</div>
          </div>
        </div>
        <div
          className={style({
            display: 'grid',
            gridTemplateRows: `75% 25%`,
            height: rem(15),
          })}
        >
          <img
            src={String(data.allContentfulPlat.edges[0].node.picture.fluid.src)}
            alt="hero"
            className={style({
              height: percent(100),
              width: percent(100),
            })}
          />
          <div
            className={style({
              ...csstips.horizontal,
              ...csstips.centerCenter,
              borderWidth: `${px(0)} ${px(2)} ${px(2)} ${px(2)}`,
              borderStyle: 'solid',
              borderBottomLeftRadius: px(3),
              borderBottomRightRadius: px(3),
            })}
          >
            Menu
          </div>
        </div>
        <div
          className={style({
            display: 'grid',
            gridTemplateRows: `75% 25%`,
            height: rem(15),
          })}
        >
          <img
            src={String(data.allContentfulPlat.edges[0].node.picture.fluid.src)}
            alt="hero"
            className={style({
              height: percent(100),
              width: percent(100),
            })}
          />
          <div
            className={style({
              ...csstips.horizontal,
              ...csstips.centerCenter,
              borderWidth: `${px(0)} ${px(2)} ${px(2)} ${px(2)}`,
              borderStyle: 'solid',
              borderBottomLeftRadius: px(3),
              borderBottomRightRadius: px(3),
            })}
          >
            Starters
          </div>
        </div>
        <div
          className={style({
            display: 'grid',
            gridTemplateRows: `75% 25%`,
            height: rem(15),
          })}
        >
          <img
            src="hero.jpg"
            alt="hero"
            className={style({
              height: percent(100),
              width: percent(100),
            })}
          />
          <div
            className={style({
              ...csstips.horizontal,
              ...csstips.centerCenter,
              borderWidth: `${px(0)} ${px(2)} ${px(2)} ${px(2)}`,
              borderStyle: 'solid',
              borderBottomLeftRadius: px(3),
              borderBottomRightRadius: px(3),
            })}
          >
            Desserts
          </div>
        </div>
      </div> */}
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
