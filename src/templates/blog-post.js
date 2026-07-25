import React from "react"
import { graphql, Link } from "gatsby"
import { Box, Container } from "theme-ui"
import Header from "../gatsby-theme-blog/components/header"
import SidebarMenu from "../gatsby-theme-blog/components/sidebar-menu"
import Footer from "../gatsby-theme-blog/components/footer"
import MarkdownRenderer from "../gatsby-theme-blog/components/markdown-renderer"
import TableOfContents from "../gatsby-theme-blog/components/table-of-contents"

export default function BlogPost({ data, location }) {
  const post = data.markdownRemark
  // displayTitle is resolved in gatsby-node.js and is always a usable string,
  // unlike frontmatter.title which is absent or non-string in most files.
  const title = post.fields.displayTitle

  const formattedDate = post.frontmatter?.date
    ? new Date(post.frontmatter.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bg: "background",
        color: "text",
      }}
    >
      <Header location={location} />

      <Box
        sx={{
          display: "flex",
          flex: 1,
          maxWidth: "1400px",
          mx: "auto",
          width: "100%",
        }}
      >
        <SidebarMenu location={location} />

        <Container
          sx={{
            flex: 1,
            maxWidth: ["100%", "100%", "900px"],
            py: 4,
            px: [3, 3, 4],
          }}
        >
          {/* Article Header */}
          <Box sx={{ mb: 4, pb: 4, borderBottom: "2px solid", borderColor: "muted" }}>
            <Box as="h1" sx={{ mb: 2, mt: 0, fontSize: 32, fontWeight: 700 }}>
              {title}
            </Box>
            <Box
              sx={{
                fontSize: "14px",
                color: "text",
                opacity: 0.7,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {formattedDate && <span>📅 {formattedDate}</span>}
              <span>✍️ {data.site.siteMetadata.author}</span>
            </Box>
          </Box>

          {/* Table of Contents */}
          {data.markdownRemark.headings && data.markdownRemark.headings.length > 0 && (
            <TableOfContents headings={data.markdownRemark.headings} />
          )}

          {/* Article Content */}
          <MarkdownRenderer html={post.html} />

          {/* Article Footer */}
          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: "2px solid",
              borderColor: "muted",
            }}
          >
            <Box sx={{ mt: 4 }}>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <Box sx={{ color: "primary", "&:hover": { textDecoration: "underline" } }}>
                  ← Back to all posts
                </Box>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export const query = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      headings {
        id
        value
        depth
      }
      fields {
        displayTitle
      }
      frontmatter {
        date
      }
    }
  }
`
