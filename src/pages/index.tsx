import * as csstips from 'csstips'
import { percent, px, rem } from 'csx'
import * as React from 'react'
import { style } from 'typestyle'
import Layout from '../components/layout'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

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
  }
}

export default function Home({ data }: Props) {
  return (
    <Layout>
      <Helmet>
        <title>
          {data.allContentfulInformations.edges[0].node.name} | Home
        </title>
      </Helmet>
      <img
        src="hero.jpg"
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
  }
`
