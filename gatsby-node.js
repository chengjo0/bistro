const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createPage({
    path: `/`,
    component: path.resolve(`src/templates/index.tsx`),
    context: {
      lang: 'fr',
    },
  })

  createPage({
    path: `/en`,
    component: path.resolve(`src/templates/index.tsx`),
    context: {
      lang: 'en',
    },
  })

  createPage({
    path: `/menus`,
    component: path.resolve(`src/templates/menus.tsx`),
    context: {
      lang: 'fr',
    },
  })

  createPage({
    path: `/en/menus`,
    component: path.resolve(`src/templates/menus.tsx`),
    context: {
      lang: 'en',
    },
  })

  createPage({
    path: `/plats`,
    component: path.resolve(`src/templates/categories.tsx`),
    context: {
      lang: 'fr',
    },
  })

  createPage({
    path: `/en/dishes`,
    component: path.resolve(`src/templates/categories.tsx`),
    context: {
      lang: 'en',
    },
  })

  createPage({
    path: `/contact`,
    component: path.resolve(`src/templates/contacts.tsx`),
    context: {
      lang: 'fr',
    },
  })

  createPage({
    path: `/en/contact`,
    component: path.resolve(`src/templates/contacts.tsx`),
    context: {
      lang: 'en',
    },
  })

  createRedirect({
    fromPath: '/en/404',
    toPath: '/404',
    isPermanent: true,
    redirectInBrowser: true,
  })

  return graphql(`
    query MyQuery {
      allContentfulListeDeCategoriesDePlats {
        edges {
          node {
            node_locale
            dishCategory {
              pathName
              dishes {
                name
                description
                price
                spicy
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    const { allContentfulListeDeCategoriesDePlats } = result.data
    allContentfulListeDeCategoriesDePlats.edges.forEach(edge => {
      const { node_locale } = edge.node
      edge.node.dishCategory.forEach(category => {
        createPage({
          path: `/${node_locale === 'fr' ? 'plats' : 'en/dishes'}/${
            category.pathName
          }`,
          component: path.resolve(`src/templates/dishes.tsx`),
          context: {
            dishes: category.dishes,
          },
        })
      })
    })
  })
}
