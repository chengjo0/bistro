module.exports = {
  plugins: [
    `gatsby-plugin-typescript`,
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `uvtt2rezrutz`,
        accessToken: `5qk4G2T8-DJKx8EzlLOie0QUsST0lARHqDSXrOuZL7U`,
      },
    },
  ],
}
