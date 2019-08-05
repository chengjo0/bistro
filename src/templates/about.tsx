import * as csstips from 'csstips'
import * as React from 'react'
import Layout from '../components/layout'
import { style } from 'typestyle'
import { percent } from 'csx'

interface Props {
  pageContext: {
    pageName: String
  }
}

export default ({ pageContext }: Props) => (
  <Layout pageName={pageContext.pageName} withPadding>
    <div className={style({ ...csstips.centerCenter, height: percent(100) })}>
      Coming soon...
    </div>
  </Layout>
)
