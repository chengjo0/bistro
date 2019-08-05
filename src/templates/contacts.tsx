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
  pageContext: {
    titles: {
      openingHours: String
      closedMessage: String
      contactMessage: String
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

const getOpeningHours = (openingHour: OpeningHour, closedMessage: String) => {
  let str = ''
  if (!openingHour.openForLunch && !openingHour.openForDinner) {
    str = String(closedMessage)
  } else {
    str += `${
      openingHour.openForLunch
        ? `${openingHour.openingHourLunch} - ${openingHour.closingHourLunch}`
        : String(closedMessage)
    }`
    str += `${
      openingHour.openForDinner
        ? ` / ${openingHour.openingHourDinner} - ${openingHour.closingHourDinner}`
        : ` / ${closedMessage}`
    }`
  }
  return <div>{str}</div>
}

export default ({ data, pageContext }: Props) => {
  return (
    <Layout pageName="Contact">
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
          {pageContext.titles.openingHours}
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
              {getOpeningHours(openingHour, pageContext.titles.closedMessage)}
            </div>
          ))}
        </div>
        <h1 className={Theme.styles.title}>
          {pageContext.titles.contactMessage}
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
  query ContactPage($locale: String) {
    contentfulInformations(node_locale: { eq: $locale }) {
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
