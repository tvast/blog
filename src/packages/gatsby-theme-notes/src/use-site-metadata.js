import { graphql, useStaticQuery } from "gatsby"

const useSiteMetadata = () => {
  const data = useStaticQuery(String.raw`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return data.site.siteMetadata
}

export default useSiteMetadata
