import React from "react"
import { graphql, Link } from "gatsby"
import { Box, Container } from "theme-ui"
import Header from "../gatsby-theme-blog/components/header"
import Footer from "../gatsby-theme-blog/components/footer"
import PostCard from "../gatsby-theme-blog/components/post-card"

const iconFor = slug => {
  const key = slug.replace(/\//g, "").toLowerCase()
  const icons = {
    begining: "🚀",
    developer_knowledge: "🧠",
    redesign_transport_order_monitoring_app: "🎯",
    moving_to_amadeus: "✈️",
    goodbye_for_loop: "🔄",
  }
  return icons[key] || "📝"
}

export default function HomePage({ data, location }) {
  const posts = data.posts.nodes
  const knowledgeCount = data.knowledge.totalCount

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

      <Container
        sx={{ flex: 1, maxWidth: "1100px", py: 4, px: [3, 3, 4], width: "100%" }}
      >
        {/* Hero */}
        <Box sx={{ mb: 6 }}>
          <Box
            as="h1"
            sx={{ mt: 0, mb: 2, fontSize: [5, 6, 7], fontWeight: "heading", color: "heading" }}
          >
            Welcome to My Developer Journey
          </Box>
          <Box as="p" sx={{ fontSize: 3, lineHeight: "body", opacity: 0.9 }}>
            Exploring web technologies, UX/UI design, and digital innovation.
          </Box>
        </Box>

        {/* Articles */}
        <Box sx={{ mb: 6 }}>
          <Box as="h2" sx={{ mb: 4, fontSize: [4, 5], fontWeight: "heading" }}>
            Latest Articles
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: ["1fr", "1fr", "1fr 1fr"],
              gap: 3,
            }}
          >
            {posts.map(node => (
              <PostCard
                key={node.id}
                title={node.fields.displayTitle}
                date={node.frontmatter?.date}
                path={node.fields.slug}
                excerpt={node.excerpt}
                icon={iconFor(node.fields.slug)}
              />
            ))}
          </Box>
        </Box>

        {/* Knowledge base entry point */}
        <Box
          sx={{
            p: 4,
            bg: "surface",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "border",
          }}
        >
          <Box as="h2" sx={{ mt: 0, mb: 2, fontSize: [4, 5], fontWeight: "heading" }}>
            📚 Knowledge Base
          </Box>
          <Box as="p" sx={{ mb: 3, opacity: 0.9 }}>
            {knowledgeCount.toLocaleString()} reference documents on plugins, skills and
            APIs — browsable as a tree.
          </Box>
          <Link
            to="/knowledge/"
            sx={{
              display: "inline-block",
              bg: "primary",
              color: "background",
              px: 3,
              py: 2,
              borderRadius: 2,
              fontWeight: "bold",
              textDecoration: "none",
              "&:hover": { opacity: 0.9 },
            }}
          >
            Browse the knowledge base →
          </Link>
        </Box>
      </Container>

      <Footer />
    </Box>
  )
}

export const query = graphql`
  {
    posts: allMarkdownRemark(filter: { fields: { collection: { eq: "posts" } } }) {
      nodes {
        id
        excerpt
        fields {
          slug
          displayTitle
        }
        frontmatter {
          date
        }
      }
    }
    knowledge: allMarkdownRemark(
      filter: { fields: { collection: { eq: "knowledge" } } }
    ) {
      totalCount
    }
  }
`
