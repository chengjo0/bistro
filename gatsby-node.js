const path = require(`path`)

exports.createPages = ({ actions }) => {
  const { createPage } = actions
  const template = path.resolve(`src/templates/contacts.tsx`)

  createPage({
    path: `/contact`,
    component: template,
    context: {
      lang: 'fr',
    },
  })

  createPage({
    path: `/en/contact`,
    component: template,
    context: {
      lang: 'en',
    },
  })
}
