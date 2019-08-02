import * as csstips from 'csstips'
import * as React from 'react'
import Layout from '../components/layout'
import { style } from 'typestyle'
import { percent } from 'csx'

export default () => (
  <Layout pageName="404" withPadding>
    <div className={style({ ...csstips.centerCenter, height: percent(100) })}>
      404, you got lost...
    </div>
  </Layout>
)
