import * as csstips from 'csstips'
import { graphql } from 'gatsby'
import * as React from 'react'
import { style } from 'typestyle'
import Layout from '../components/layout'
import { rem, percent } from 'csx'

interface Props {
  data: {
    contentfulInformations: {
      address: String
      phoneNumber: String
      hours: Array<OpeningHour>
      title: String
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

export default ({ data }: Props) => (
  <Layout pageName="Contacts">
    <div
      className={style({
        ...csstips.flex,
        ...csstips.centerCenter,
        ...csstips.vertical,
        ...csstips.verticallySpaced(rem(2)),
        height: percent(100),
        $nest: {
          '& > div': {
            ...csstips.centerCenter,
            ...csstips.vertical,
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
        Horaires:
      </h1>
      <div>
        {data.contentfulInformations.hours.map(openingHour => (
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
        ))}
      </div>
      <div>
        <h1
          className={style({
            fontFamily: 'Oswald',
            fontWeight: 500,
          })}
        >
          Addresse & Contact:
        </h1>
        <div>{data.contentfulInformations.address}</div>
        <a href={`tel:${data.contentfulInformations.phoneNumber}`}>
          {data.contentfulInformations.phoneNumber}
        </a>
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query ContactPage {
    contentfulInformations {
      address
      hours {
        openForLunch
        openForDinner
        closingHourDinner
        closingHourLunch
        openingHourDinner
        openingHourLunch
        period
      }
      phoneNumber
    }
  }
`
