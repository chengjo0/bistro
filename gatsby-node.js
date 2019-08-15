const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createPage({
    path: `/`,
    component: path.resolve(`src/templates/index.tsx`),
    context: {
      locale: 'fr',
      pageName: 'Accueil',
    },
  })

  createPage({
    path: `/en/home`,
    component: path.resolve(`src/templates/index.tsx`),
    context: {
      locale: 'en',
      pageName: 'Home',
    },
  })

  createPage({
    path: `/notre-histoire`,
    component: path.resolve(`src/templates/about.tsx`),
    context: {
      locale: 'fr',
      pageName: 'Notre histoire',
    },
  })

  createPage({
    path: `/en/about`,
    component: path.resolve(`src/templates/about.tsx`),
    context: {
      locale: 'fr',
      pageName: 'About',
    },
  })

  createRedirect({
    fromPath: '/en/404',
    toPath: '/404',
    isPermanent: true,
    redirectInBrowser: true,
  })

  return graphql(`
    query getContactMessages {
      fr: allContentfulMessages(filter: { node_locale: { eq: "fr" } }) {
        edges {
          node {
            messages {
              text
              slug
            }
          }
        }
      }
      en: allContentfulMessages(filter: { node_locale: { eq: "en" } }) {
        edges {
          node {
            messages {
              text
              slug
            }
          }
        }
      }
      frSpecialities: allContentfulPlats(
        filter: {
          node_locale: { eq: "fr" }
          category: { elemMatch: { speciality: { eq: true } } }
        }
      ) {
        edges {
          node {
            category {
              title
              dishes {
                name
                description
                price
                spicy
              }
              link {
                url
              }
            }
          }
        }
      }
      enSpecialities: allContentfulPlats(
        filter: {
          node_locale: { eq: "en" }
          category: { elemMatch: { speciality: { eq: true } } }
        }
      ) {
        edges {
          node {
            category {
              title
              dishes {
                name
                description
                price
                spicy
              }
              link {
                url
              }
            }
          }
        }
      }
      frDishes: allContentfulPlats(
        filter: {
          node_locale: { eq: "fr" }
          category: { elemMatch: { speciality: { eq: false } } }
        }
      ) {
        edges {
          node {
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
      }
      enDishes: allContentfulPlats(
        filter: {
          node_locale: { eq: "en" }
          category: { elemMatch: { speciality: { eq: false } } }
        }
      ) {
        edges {
          node {
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
      }
    }
  `).then(result => {
    if (!result) {
      throw new Error(result)
    }

    const frMessages = result.data.fr.edges.reduce((acc, val) => {
      return acc.concat(val.node.messages)
    }, [])

    const enMessages = result.data.en.edges.reduce((acc, val) => {
      return acc.concat(val.node.messages)
    }, [])

    createPage({
      path: `/contact`,
      component: path.resolve(`src/templates/contacts.tsx`),
      context: {
        locale: 'fr',
        titles: {
          openingHours: frMessages.find(
            msg => msg.slug === 'opening-hour-message'
          ).text,
          closedMessage: frMessages.find(
            msg => msg.slug === 'closed-restaurant-message'
          ).text,
          contactMessage: frMessages.find(msg => msg.slug === 'contact-message')
            .text,
        },
      },
    })

    createPage({
      path: `/en/contact`,
      component: path.resolve(`src/templates/contacts.tsx`),
      context: {
        locale: 'en',
        titles: {
          openingHours: enMessages.find(
            msg => msg.slug === 'opening-hour-message'
          ).text,
          closedMessage: enMessages.find(
            msg => msg.slug === 'closed-restaurant-message'
          ).text,
          contactMessage: enMessages.find(msg => msg.slug === 'contact-message')
            .text,
        },
      },
    })

    createPage({
      path: `/menus`,
      component: path.resolve(`src/templates/menu.tsx`),
      context: {
        locale: 'fr',
        pageName: 'Formules Midi',
        contentful_id: '2Kl5u37PiD8DzI30lswPvT',
        accompaniementMessage: frMessages.find(
          msg => msg.slug === 'accompagnement'
        ).text,
      },
    })

    createPage({
      path: `/en/menus`,
      component: path.resolve(`src/templates/menu.tsx`),
      context: {
        locale: 'en',
        pageName: 'Lunch Menus',
        contentful_id: '2Kl5u37PiD8DzI30lswPvT',
        accompaniementMessage: enMessages.find(
          msg => msg.slug === 'accompagnement'
        ).text,
      },
    })

    createPage({
      path: `/menu-bistro`,
      component: path.resolve(`src/templates/menu.tsx`),
      context: {
        locale: 'fr',
        pageName: 'Menu Bistro',
        contentful_id: 'uxck5OvoAqQNx71EttTog',
        accompaniementMessage: frMessages.find(
          msg => msg.slug === 'accompagnement'
        ).text,
      },
    })

    createPage({
      path: `/en/menu-bistro`,
      component: path.resolve(`src/templates/menu.tsx`),
      context: {
        locale: 'en',
        pageName: 'Menu Bistro',
        contentful_id: 'uxck5OvoAqQNx71EttTog',
        accompaniementMessage: enMessages.find(
          msg => msg.slug === 'accompagnement'
        ).text,
      },
    })

    result.data.frSpecialities.edges[0].node.category.forEach(element => {
      createPage({
        path: element.link.url,
        component: path.resolve(`src/templates/dishes.tsx`),
        context: {
          pageName: element.title,
          accompaniementMessage: frMessages.find(
            msg => msg.slug === 'accompagnement'
          ).text,
          dishesByCategories: [element],
        },
      })
    })

    result.data.enSpecialities.edges[0].node.category.forEach(element => {
      createPage({
        path: element.link.url,
        component: path.resolve(`src/templates/dishes.tsx`),
        context: {
          pageName: element.title,
          accompaniementMessage: frMessages.find(
            msg => msg.slug === 'accompagnement'
          ).text,
          dishesByCategories: [element],
        },
      })
    })

    createPage({
      path: `/plats`,
      component: path.resolve(`src/templates/dishes.tsx`),
      context: {
        locale: 'fr',
        pageName: 'Plats',
        accompaniementMessage: frMessages.find(
          msg => msg.slug === 'accompagnement'
        ).text,
        dishesByCategories: result.data.frDishes.edges[0].node.category,
      },
    })

    createPage({
      path: `/en/dishes`,
      component: path.resolve(`src/templates/dishes.tsx`),
      context: {
        locale: 'en',
        pageName: 'Dishes',
        accompaniementMessage: enMessages.find(
          msg => msg.slug === 'accompagnement'
        ).text,
        dishesByCategories: result.data.enDishes.edges[0].node.category,
      },
    })
  })
}
