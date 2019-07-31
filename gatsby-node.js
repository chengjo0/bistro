const path = require(`path`)

exports.createPages = ({ actions }) => {
  const { createPage, createRedirect } = actions

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

  createRedirect({
    fromPath: '/en/404',
    toPath: '/404',
    isPermanent: true,
    redirectInBrowser: true,
  })
}
