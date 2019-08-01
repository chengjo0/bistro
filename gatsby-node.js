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
    path: `/en/home`,
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
      fr: contentfulPages(node_locale: { eq: "fr" }) {
        pageList {
          ... on ContentfulCategorie {
            id
            title
            url
            plats {
              name
              description
              price
              spicy
            }
          }
        }
      }
      en: contentfulPages(node_locale: { eq: "en" }) {
        pageList {
          ... on ContentfulCategorie {
            id
            title
            url
            plats {
              name
              description
              price
              spicy
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    result.data['fr'].pageList.forEach(page => {
      createPage({
        path: page.url,
        component: path.resolve(`src/templates/dishes.tsx`),
        context: {
          dishes: page.plats,
          title: page.title,
        },
      })
    })

    result.data['en'].pageList.forEach(page => {
      createPage({
        path: page.url,
        component: path.resolve(`src/templates/dishes.tsx`),
        context: {
          dishes: page.plats,
          title: page.title,
        },
      })
    })
  })
}
