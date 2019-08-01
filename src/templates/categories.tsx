import * as csstips from 'csstips'
import * as React from 'react'
import Layout from '../components/layout'
import { style } from 'typestyle'
import { percent } from 'csx'
import { graphql, Link } from 'gatsby'

interface Props {
  data: {
    contentfulPages: {
      pageList: Array<{
        title: String
        url: String
      }>
    }
  }
}

export default ({ data }: Props) => (
  <Layout pageName="Menu" withPadding>
    <div className={style({ ...csstips.centerCenter, height: percent(100) })}>
      {data.contentfulPages.pageList.map(category => (
        <Link key={String(category.title)} to={`${category.url}`}>
          {category.title}
        </Link>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query GetDishesPages($lang: String) {
    contentfulPages(
      node_locale: { eq: $lang }
      contentful_id: { eq: "1i7wC5nQiERnHz4LNzxkpP" }
    ) {
      pageList {
        ... on ContentfulCategorie {
          id
          title
          url
        }
      }
    }
  }
`
