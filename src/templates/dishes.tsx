import * as csstips from 'csstips'
import * as React from 'react'
import Layout from '../components/layout'
import { style } from 'typestyle'
import { percent, rem } from 'csx'
import { graphql } from 'gatsby'

interface Props {
  data: {
    contentfulEntrees: {
      title: String
      dishes: Array<{
        name: String
        description: String
        price: Number
        spicy: Boolean
      }>
    }
  }
}

export default ({ data }: Props) => (
  <Layout pageName={data.contentfulEntrees.title} withPadding>
    <div
      className={style({
        ...csstips.centerCenter,
        ...csstips.vertical,
        ...csstips.verticallySpaced(rem(2)),
        height: percent(100),
      })}
    >
      {data.contentfulEntrees.dishes.map(dish => (
        <div
          className={style({
            ...csstips.vertical,
          })}
        >
          <span>{dish.name}</span>
          <span>{dish.description}</span>
          <span>{dish.price} €</span>
          <span>{dish.spicy}</span>
        </div>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query GetStarters($lang: String) {
    contentfulEntrees(node_locale: { eq: $lang }) {
      title
      dishes {
        name
        description
        price
        spicy
      }
    }
  }
`
