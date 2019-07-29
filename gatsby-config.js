const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `Bistro d'Asie`,
    titleTemplate: '%s · Cuisine Fusion',
    description: 'Restaurant website',
    url: 'https://bistrodasie.com',
    languages: {
      defaultLangKey: 'fr',
      langs: ['fr', 'en-US'],
    },
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.GATSBY_SPACE_ID,
        accessToken: process.env.GATSBY_ACCESS_TOKEN,
        downloadLocal: true,
        localeFilter: locale => locale.code === 'fr',
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: [
            'Oswald:400,500,700',
            'Asap:400',
            'Raleway:400,500,700',
            'Montserrat:400,500,600',
          ],
        },
      },
    },
  ],
}
