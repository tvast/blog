import React from "react"
import { graphql, Link } from "gatsby"
import { Box, Container } from "theme-ui"
import Header from "../gatsby-theme-blog/components/header"
import Footer from "../gatsby-theme-blog/components/footer"
import MarkdownRenderer from "../gatsby-theme-blog/components/markdown-renderer"
import TableOfContents from "../gatsby-theme-blog/components/table-of-contents"

/** "/knowledge/plugins/hugging-face/skills/" -> breadcrumb segments with hrefs */
const breadcrumbsFor = slug => {
  const parts = slug.split(`/`).filter(Boolean)
  return parts.map((part, i) => ({
    label: part.replace(/[-_]+/g, ` `),
    href: `/${parts.slice(0, i + 1).join(`/`)}/`,
    isLast: i === parts.length - 1,
  }))
}

export default function KnowledgePage({ data, pageContext, location }) {
  const page = data.markdownRemark
  const title = page.fields.displayTitle
  const crumbs = breadcrumbsFor(pageContext.slug)

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

      <Container sx={{ flex: 1, maxWidth: "900px", py: 4, px: [3, 3, 4], width: "100%" }}>
        {/* Breadcrumbs */}
        <Box
          as="nav"
          aria-label="Breadcrumb"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
            mb: 4,
            fontSize: 0,
            opacity: 0.8,
          }}
        >
          {crumbs.map((crumb, i) => (
            <Box key={crumb.href} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {i > 0 && <Box aria-hidden sx={{ opacity: 0.5 }}>/</Box>}
              {crumb.isLast ? (
                <Box as="span" sx={{ fontWeight: "bold" }}>
                  {crumb.label}
                </Box>
              ) : (
                <Link
                  to={crumb.href}
                  sx={{
                    color: "primary",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {crumb.label}
                </Link>
              )}
            </Box>
          ))}
        </Box>

        <Box
          as="h1"
          sx={{ mt: 0, mb: 3, fontSize: [5, 6], fontWeight: "heading", color: "heading" }}
        >
          {title}
        </Box>

        {page.headings?.length > 0 && <TableOfContents headings={page.headings} />}

        <MarkdownRenderer html={page.html} />

        <Box sx={{ mt: 6, pt: 4, borderTop: "2px solid", borderColor: "muted" }}>
          <Link
            to="/knowledge/"
            sx={{
              color: "primary",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            ← Back to knowledge base
          </Link>
        </Box>
      </Container>

      <Footer />
    </Box>
  )
}

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      headings {
        id
        value
        depth
      }
      fields {
        displayTitle
        collection
      }
    }
  }
`
