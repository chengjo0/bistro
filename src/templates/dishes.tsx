import * as csstips from 'csstips'
import { percent, rem } from 'csx'
import * as React from 'react'
import { style } from 'typestyle'
import Layout from '../components/layout'

interface Props {
  pageContext: {
    pageName: String
    dishes: Array<{
      name: String
      description?: String
      price: Number
      spicy: Boolean
    }>
  }
}

export default ({ pageContext }: Props) => {
  const { dishes, pageName } = pageContext
  return (
    <Layout pageName={pageName} withPadding>
      <div
        className={style({
          ...csstips.centerCenter,
          ...csstips.vertical,
          ...csstips.verticallySpaced(rem(2)),
          height: percent(100),
        })}
      >
        {dishes.map(dish => (
          <div
            key={String(dish.name)}
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
}
