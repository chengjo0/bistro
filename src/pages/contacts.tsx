import * as csstips from 'csstips'
import { graphql } from 'gatsby'
import * as React from 'react'
import { style } from 'typestyle'
import Layout from '../components/layout'
import { rem, percent } from 'csx'

interface Props {
  data: {
    contentfulContacts: {
      information: {
        address: String
        phone: String
      }
      openingHours: Array<OpeningHour>
      title: String
    }
  }
}

type OpeningHour = {
  period: String
  lunchOpeningTime: String
  lunchClosingTime: String
  dinnerOpeningTime: String
  dinnerClosingTime: String
  openingType: 'Fermé' | 'Midi seulement' | 'Midi et soir'
}

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
        {data.contentfulContacts.title}
      </h1>
      <div>
        {data.contentfulContacts.openingHours.map(openingHour => (
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
        <div>{data.contentfulContacts.information.address}</div>
        <a href={`tel:${data.contentfulContacts.information.phone}`}>
          {data.contentfulContacts.information.phone}
        </a>
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  query ContactPage {
    contentfulContacts {
      information {
        address
        phone
      }
      openingHours {
        dinnerClosingTime
        dinnerOpeningTime
        lunchClosingTime
        lunchOpeningTime
        openingType
        period
      }
      title
    }
  }
`
