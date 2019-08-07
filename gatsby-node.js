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
    path: `/menus`,
    component: path.resolve(`src/templates/lunchMenus.tsx`),
    context: {
      locale: 'fr',
      pageName: 'Formules Midi',
    },
  })

  createPage({
    path: `/en/menus`,
    component: path.resolve(`src/templates/lunchMenus.tsx`),
    context: {
      locale: 'en',
      pageName: 'Lunch Menus',
    },
  })

  createPage({
    path: `/menu-bistro`,
    component: path.resolve(`src/templates/menu.tsx`),
    context: {
      locale: 'fr',
      pageName: 'Menu Bistro',
    },
  })

  createPage({
    path: `/en/menu-bistro`,
    component: path.resolve(`src/templates/menu.tsx`),
    context: {
      locale: 'en',
      pageName: 'Menu Bistro',
    },
  })

  createPage({
    path: `/plats`,
    component: path.resolve(`src/templates/dishes.tsx`),
    context: {
      locale: 'fr',
      pageName: 'Plats',
    },
  })

  createPage({
    path: `/en/dishes`,
    component: path.resolve(`src/templates/dishes.tsx`),
    context: {
      locale: 'en',
      pageName: 'Dishes',
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
      fr: contentfulMessages(node_locale: { eq: "fr" }) {
        messages {
          text
          slug
        }
      }
      en: contentfulMessages(node_locale: { eq: "en" }) {
        messages {
          text
          slug
        }
      }
    }
  `).then(result => {
    createPage({
      path: `/contact`,
      component: path.resolve(`src/templates/contacts.tsx`),
      context: {
        locale: 'fr',
        titles: {
          openingHours: result.data.fr.messages.find(
            msg => msg.slug === 'opening-hour-message'
          ).text,
          closedMessage: result.data.fr.messages.find(
            msg => msg.slug === 'closed-restaurant-message'
          ).text,
          contactMessage: result.data.fr.messages.find(
            msg => msg.slug === 'contact-message'
          ).text,
        },
      },
    })

    createPage({
      path: `/en/contact`,
      component: path.resolve(`src/templates/contacts.tsx`),
      context: {
        locale: 'en',
        titles: {
          openingHours: result.data.en.messages.find(
            msg => msg.slug === 'opening-hour-message'
          ).text,
          closedMessage: result.data.en.messages.find(
            msg => msg.slug === 'closed-restaurant-message'
          ).text,
          contactMessage: result.data.en.messages.find(
            msg => msg.slug === 'contact-message'
          ).text,
        },
      },
    })
  })
}
