import { graphql, withPrefix, navigate } from 'gatsby'
import * as React from 'react'
import { getUserLangKey } from 'ptz-i18n'

class RedirectIndex extends React.Component {
  constructor(args: any) {
    super(args)

    //   // Skip build, Browsers only
    if (typeof window !== 'undefined') {
      const { langs, defaultLangKey } = args.data.site.siteMetadata.languages
      const langKey = getUserLangKey(langs, defaultLangKey)
      const homeUrl = withPrefix(`/en/`)
      navigate(homeUrl)
    }
  }

  render() {
    // It's recommended to add your SEO solution in here for bots
    // eg. https://github.com/ahimsayogajp/ahimsayoga-gatsby/blob/master/src/pages/index.js#L22
    return <div />
  }
}

export default RedirectIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        languages {
          defaultLangKey
          langs
        }
      }
    }
  }
`
