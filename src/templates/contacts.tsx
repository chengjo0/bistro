import * as csstips from 'csstips'
import { percent, rem } from 'csx'
import { graphql } from 'gatsby'
import * as React from 'react'
import { style } from 'typestyle'
import Layout from '../components/layout'
import { LanguageContext } from '../context'
import * as Theme from '../theme'

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

export default ({ data }: Props) => {
  const value = React.useContext(LanguageContext)

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
        <div className={Theme.styles.title}>
          {value.lang == 'fr' ? 'Horaires:' : 'Hours:'}
        </div>
        <div>
          {data.contentfulInformations.hours.map(openingHour => (
            <div
              key={`${openingHour.period}`}
              className={style({
                ...csstips.horizontal,
                $nest: {
                  '& > div:first-child': {
                    paddingRight: rem(1),
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
        <h1 className={Theme.styles.title}>
          {value.lang == 'fr' ? 'Adresse & Contact:' : 'Address & Contact:'}
        </h1>
        <div>
          <div>{data.contentfulInformations.address}</div>
          <a href={`tel:${data.contentfulInformations.phoneNumber}`}>
            {data.contentfulInformations.phoneNumber}
          </a>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ContactPage($lang: String) {
    contentfulInformations(node_locale: { eq: $lang }) {
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
