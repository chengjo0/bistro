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
  pageContext: {
    pageName: String
  }
}

export default ({ data, pageContext }: Props) => (
  <Layout pageName={pageContext.pageName} withPadding>
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
  query GetDishesPages($locale: String) {
    contentfulPages(
      node_locale: { eq: $locale }
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
