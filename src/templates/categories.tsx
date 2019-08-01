import * as csstips from 'csstips'
import * as React from 'react'
import Layout from '../components/layout'
import { style } from 'typestyle'
import { percent } from 'csx'
import { graphql, Link } from 'gatsby'

interface Props {
  data: {
    contentfulListeDeCategoriesDePlats: {
      dishCategory: Array<{
        pathName: String
        title: String
      }>
    }
  }
}

export default ({ data }: Props) => (
  <Layout pageName="Menu" withPadding>
    <div className={style({ ...csstips.centerCenter, height: percent(100) })}>
      {data.contentfulListeDeCategoriesDePlats.dishCategory.map(category => (
        <Link to={`${window.location.pathname}/${category.pathName}`}>
          {category.title}
        </Link>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query GetCategories($lang: String) {
    contentfulListeDeCategoriesDePlats(node_locale: { eq: $lang }) {
      dishCategory {
        pathName
        title
      }
    }
  }
`
