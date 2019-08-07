import * as csstips from 'csstips'
import * as React from 'react'
import Layout from '../components/layout'
import { style } from 'typestyle'
import { percent } from 'csx'
import { graphql } from 'gatsby'

interface Props {
  data: {
    packages: {
      formules: Array<{
        title: String
        price: Number
      }>
    }
    possibilities: {
      menuDishes: Array<{
        title: String
        dishes: Array<{
          name: String
          description: String
          spicy: Boolean
        }>
      }>
    }
  }
}

export default ({ data: { packages, possibilities } }: Props) => (
  <Layout pageName="Menu" withPadding>
    <div className={style({ ...csstips.centerCenter, height: percent(100) })}>
      Coming soon...
      {console.log(JSON.stringify(packages, undefined, 2))}
      {console.log(JSON.stringify(possibilities, undefined, 2))}
    </div>
  </Layout>
)

export const query = graphql`
  query GetMenus {
    packages: contentfulMenus {
      formules {
        title
        price
      }
    }
    possibilities: contentfulMenus {
      menuDishes {
        title
        dishes {
          name
          description
          spicy
        }
      }
    }
  }
`
