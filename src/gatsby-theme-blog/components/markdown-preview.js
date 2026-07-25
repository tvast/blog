import React, { useState } from "react"
import { Box } from "theme-ui"
import MarkdownValidator from "./markdown-validator"
import MarkdownRenderer from "./markdown-renderer"
import TableOfContents from "./table-of-contents"

export default function MarkdownPreview({ rawMarkdown, headings }) {
  const [showValidator, setShowValidator] = useState(false)

  const extractFrontmatter = (content) => {
    const match = content.match(/^---\n([\s\S]*?)\n---/)
    if (match) {
      const lines = match[1].split("\n")
      const fm = {}
      lines.forEach((line) => {
        const [key, ...valueParts] = line.split(":")
        const value = valueParts.join(":").trim().replace(/^["']|["']$/g, "")
        if (key && value) {
          fm[key.trim()] = value
        }
      })
      return fm
    }
    return {}
  }

  const frontmatter = extractFrontmatter(rawMarkdown)

  return (
    <Box sx={{ mb: 6 }}>
      {/* Metadata Preview */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          bg: "muted",
          borderRadius: "8px",
          border: "1px solid",
          borderColor: "border",
        }}
      >
        <Box sx={{ display: "grid", gridTemplateColumns: ["1fr", "1fr 1fr"], gap: 2 }}>
          {frontmatter.title && (
            <Box>
              <Box sx={{ fontSize: "12px", opacity: 0.7, textTransform: "uppercase" }}>
                Title
              </Box>
              <Box sx={{ fontWeight: 600 }}>{frontmatter.title}</Box>
            </Box>
          )}
          {frontmatter.date && (
            <Box>
              <Box sx={{ fontSize: "12px", opacity: 0.7, textTransform: "uppercase" }}>
                Date
              </Box>
              <Box sx={{ fontWeight: 600 }}>{frontmatter.date}</Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Validator Toggle */}
      <Box sx={{ mb: 3 }}>
        <Box
          as="button"
          onClick={() => setShowValidator(!showValidator)}
          sx={{
            bg: showValidator ? "secondary" : "primary",
            color: "background",
            px: 3,
            py: 2,
            borderRadius: "6px",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          {showValidator ? "✓ Hide" : "⚠️ Validate"} Markdown
        </Box>
      </Box>

      {/* Markdown Validator */}
      {showValidator && <MarkdownValidator content={rawMarkdown} />}

      {/* Table of Contents */}
      {headings && headings.length > 0 && <TableOfContents headings={headings} />}
    </Box>
  )
}
