import * as csstips from 'csstips'
import { percent, rem } from 'csx'
import { graphql } from 'gatsby'
import * as React from 'react'
import { style } from 'typestyle'
import Layout from '../components/layout'
import { LanguageContext } from '../context'

type NodeType = {
  node: {
    node_locale: 'fr' | 'en'
    address: String
    phoneNumber: String
    hours: Array<OpeningHour>
  }
}

interface Props {
  data: {
    allContentfulInformations: {
      edges: Array<NodeType>
    }
  }
}

type OpeningHour = {
  period: String
  closingHourLunch: String
  openingHourLunch: String
  closingHourDinner: String
  openingHourDinner: String
  openForLunch: Boolean
  openForDinner: Boolean
}

const getOpeningHours = (openingHour: OpeningHour) => {
  let str = ''
  if (!openingHour.openForLunch && !openingHour.openForDinner) {
    str = 'Fermé'
  } else {
    str += `${
      openingHour.openForLunch
        ? `${openingHour.openingHourLunch} - ${openingHour.closingHourLunch}`
        : 'Fermé'
    }`
    str += `${
      openingHour.openForDinner
        ? ` / ${openingHour.openingHourDinner} - ${openingHour.closingHourDinner}`
        : ' / Fermé'
    }`
  }
  return <div>{str}</div>
}

export default ({ data }: Props) => {
  const value = React.useContext(LanguageContext)
  const restaurantInfo = data.allContentfulInformations.edges.find(
    edge => edge.node.node_locale === value.lang
  )

  if (!restaurantInfo) {
    return
  }

  return (
    <Layout pageName="Contacts">
      <div
        className={style({
          ...csstips.flex,
          ...csstips.centerCenter,
          ...csstips.vertical,
          ...csstips.verticallySpaced(rem(4)),
          height: percent(100),
          $nest: {
            '& > div': {
              ...csstips.centerCenter,
              ...csstips.vertical,
              ...csstips.verticallySpaced(rem(1)),
            },
          },
        })}
      >
        <h1
          className={style({
            fontFamily: 'Oswald',
            fontWeight: 500,
          })}
        >
          {value.lang == 'fr' ? 'Horaires:' : 'Hours:'}
        </h1>
        <div>
          {restaurantInfo.node.hours.map(openingHour => (
            <div
              key={`${openingHour.period}`}
              className={style({
                ...csstips.horizontal,
                $nest: {
                  '& > div:first-child': {
                    paddingRight: rem(1),
                    // fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold',
                  },
                },
              })}
            >
              <div>{openingHour.period} :</div>
              {getOpeningHours(openingHour)}
            </div>
          ))}
        </div>
        <h1
          className={style({
            fontFamily: 'Oswald',
            fontWeight: 500,
          })}
        >
          {value.lang == 'fr' ? 'Adresse & Contact:' : 'Address & Contact:'}
        </h1>
        <div>
          <div>{restaurantInfo.node.address}</div>
          <a href={`tel:${restaurantInfo.node.phoneNumber}`}>
            {restaurantInfo.node.phoneNumber}
          </a>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ContactPage {
    allContentfulInformations {
      edges {
        node {
          node_locale
          address
          phoneNumber
          hours {
            openForLunch
            openForDinner
            closingHourDinner
            closingHourLunch
            openingHourDinner
            openingHourLunch
            period
          }
        }
      }
    }
  }
`
