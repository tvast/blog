import React, { useState, useMemo } from "react"
import { graphql, Link } from "gatsby"
import { Box, Container, Input } from "theme-ui"
import Header from "../gatsby-theme-blog/components/header"
import Footer from "../gatsby-theme-blog/components/footer"

/**
 * Turn a flat list of slugs into a nested tree.
 * "/knowledge/plugins/hugging-face/skills/arxiv/" becomes
 * plugins > hugging-face > skills > arxiv(leaf).
 */
const buildTree = nodes => {
  const root = { name: "", children: new Map(), leaf: null }

  nodes.forEach(node => {
    const parts = node.fields.slug.split("/").filter(Boolean)
    // Drop the leading "knowledge" segment; it is the section root.
    const segments = parts[0] === "knowledge" ? parts.slice(1) : parts

    let cursor = root
    segments.forEach((segment, i) => {
      if (!cursor.children.has(segment)) {
        cursor.children.set(segment, {
          name: segment,
          children: new Map(),
          leaf: null,
        })
      }
      cursor = cursor.children.get(segment)
      if (i === segments.length - 1) {
        cursor.leaf = { slug: node.fields.slug, title: node.fields.displayTitle }
      }
    })
  })

  return root
}

const label = name => name.replace(/[-_]+/g, " ")

function TreeNode({ node, depth }) {
  const [open, setOpen] = useState(depth === 0)
  const children = [...node.children.values()]
  const hasChildren = children.length > 0

  return (
    <Box sx={{ pl: depth === 0 ? 0 : 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, py: "2px" }}>
        {hasChildren ? (
          <Box
            as="button"
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            sx={{
              bg: "transparent",
              border: "none",
              cursor: "pointer",
              color: "text",
              p: 0,
              width: "1.2em",
              fontSize: 0,
              lineHeight: 1,
            }}
          >
            {open ? "▾" : "▸"}
          </Box>
        ) : (
          <Box aria-hidden sx={{ width: "1.2em" }} />
        )}

        {node.leaf ? (
          <Link
            to={node.leaf.slug}
            sx={{
              color: "primary",
              textDecoration: "none",
              fontSize: 1,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {node.leaf.title}
          </Link>
        ) : (
          <Box
            as="span"
            sx={{ fontWeight: "bold", fontSize: 1, textTransform: "capitalize" }}
          >
            {label(node.name)}
          </Box>
        )}

        {hasChildren && (
          <Box as="span" sx={{ fontSize: 0, opacity: 0.5 }}>
            ({children.length})
          </Box>
        )}
      </Box>

      {open &&
        hasChildren &&
        children.map(child => (
          <TreeNode key={child.name} node={child} depth={depth + 1} />
        ))}
    </Box>
  )
}

export default function KnowledgeIndex({ data, location }) {
  const nodes = data.allMarkdownRemark.nodes
  const [filter, setFilter] = useState("")

  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase()
    if (!q) return nodes
    return nodes.filter(
      n =>
        n.fields.slug.toLowerCase().includes(q) ||
        (n.fields.displayTitle || "").toLowerCase().includes(q)
    )
  }, [nodes, filter])

  const tree = useMemo(() => buildTree(visible), [visible])
  const topLevel = [...tree.children.values()]

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
        sx={{ flex: 1, maxWidth: "1000px", py: 4, px: [3, 3, 4], width: "100%" }}
      >
        <Box
          as="h1"
          sx={{ mt: 0, mb: 2, fontSize: [5, 6], fontWeight: "heading", color: "heading" }}
        >
          Knowledge Base
        </Box>
        <Box as="p" sx={{ mb: 4, opacity: 0.9 }}>
          {nodes.length.toLocaleString()} documents.{" "}
          {filter && `${visible.length.toLocaleString()} matching.`}
        </Box>

        <Input
          type="search"
          placeholder="Filter by title or path…"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          sx={{
            mb: 4,
            p: 2,
            border: "1px solid",
            borderColor: "border",
            borderRadius: 2,
            bg: "background",
            color: "text",
            fontFamily: "body",
            "&:focus": { outline: "none", borderColor: "primary" },
          }}
        />

        <Box
          sx={{
            p: 3,
            bg: "surface",
            borderRadius: 3,
            border: "1px solid",
            borderColor: "border",
          }}
        >
          {topLevel.length === 0 ? (
            <Box sx={{ opacity: 0.7 }}>No documents match “{filter}”.</Box>
          ) : (
            topLevel.map(node => (
              <TreeNode key={node.name} node={node} depth={0} />
            ))
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "knowledge" } } }
      sort: { fields: { slug: ASC } }
    ) {
      nodes {
        id
        fields {
          slug
          displayTitle
        }
      }
    }
  }
`
