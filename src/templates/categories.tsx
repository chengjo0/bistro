import * as csstips from 'csstips'
import { px, rem, color } from 'csx'
import { graphql } from 'gatsby'
import * as React from 'react'
import { style, classes } from 'typestyle'
import Layout from '../components/layout'
import * as Theme from '../theme'

interface Props {
  data: {
    contentfulPlats: {
      category: Array<{
        title: String
        dishes: Array<{
          name: String
          description: String
          price: Number
          spicy: Boolean
        }>
      }>
    }
  }
  pageContext: {
    pageName: String
  }
}

export default ({ data, pageContext }: Props) => (
  <Layout pageName={pageContext.pageName} withPadding>
    <div
      className={style(
        ...Theme.breakpoints({
          mobile: {
            padding: Theme.paddings.mobile,
          },
          desktop: {
            padding: Theme.paddings.desktop,
          },
        }),
        {
          ...csstips.flex,
          ...csstips.vertical,
          ...csstips.verticallySpaced(rem(1)),
          $nest: {
            '& > div:not(:first-child)': {
              paddingTop: rem(3),
            },
          },
        }
      )}
    >
      {data.contentfulPlats.category.map(category => (
        <div
          key={String(category.title)}
          className={style({
            ...csstips.centerCenter,
            ...csstips.vertical,
          })}
        >
          <div
            className={classes(
              Theme.styles.title,
              style({
                paddingBottom: rem(3),
                ...csstips.vertical,
                ...csstips.center,
                ...csstips.verticallySpaced(rem(1)),
              })
            )}
          >
            <span>{category.title}</span>
            <span
              className={style({
                borderBottomStyle: 'solid',
                borderBottomWidth: px(1),
                borderBottomColor: Theme.colors.gold.toString(),
                width: rem(3),
              })}
            ></span>
          </div>
          {category.dishes.map((dish, index) => (
            <div
              key={String(dish.name)}
              className={style({
                ...csstips.vertical,
                ...csstips.verticallySpaced(rem(1)),
                textAlign: 'center',
                paddingTop: index > 0 ? rem(2) : rem(0),
              })}
            >
              <span
                className={style({
                  fontFamily: Theme.fonts.title,
                  fontSize: Theme.fontSizes.textMedium,
                  fontWeight: 400,
                })}
              >
                {dish.name}
                {dish.spicy ? (
                  <i
                    className={classes(
                      'fas fa-pepper-hot',
                      style({
                        paddingLeft: rem(1),
                        color: color('red')
                          .darken(0.1)
                          .toString(),
                      })
                    )}
                  ></i>
                ) : null}
              </span>
              {dish.description ? (
                <span
                  className={style({
                    fontSize: Theme.fontSizes.textExtraSmall,
                    fontStyle: 'italic',
                  })}
                >
                  ( {dish.description} )
                </span>
              ) : null}
              <span>{dish.price}0 €</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query GetDishesPages($locale: String) {
    contentfulPlats(node_locale: { eq: $locale }) {
      category {
        title
        dishes {
          name
          description
          price
          spicy
        }
      }
    }
  }
`
