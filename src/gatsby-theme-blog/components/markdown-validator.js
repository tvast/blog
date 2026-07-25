import React, { useState } from "react"
import { Box } from "theme-ui"

export default function MarkdownValidator({ content }) {
  const [validationResults, setValidationResults] = useState(null)

  const validateMarkdown = () => {
    const issues = []

    // Check for frontmatter
    if (!content.startsWith("---")) {
      issues.push({
        type: "warning",
        message: "Missing YAML frontmatter. Add --- at the start.",
      })
    }

    // Check for title
    if (!content.includes("title:")) {
      issues.push({
        type: "error",
        message: 'Missing "title" in frontmatter.',
      })
    }

    // Check for headings
    const headings = content.match(/^#{1,6}\s/gm)
    if (!headings) {
      issues.push({
        type: "warning",
        message: "No headings found. Add at least one heading with #.",
      })
    }

    // Check for broken image links
    const imageLinks = content.match(/!\[.*?\]\((.*?)\)/g) || []
    imageLinks.forEach((link) => {
      const url = link.match(/\((.*?)\)/)[1]
      if (url.startsWith("http") && !url.match(/^https?:\/\//)) {
        issues.push({
          type: "warning",
          message: `Image link uses HTTP instead of HTTPS: ${url}`,
        })
      }
    })

    // Check for broken links
    const links = content.match(/\[.*?\]\((.*?)\)/g) || []
    links.forEach((link) => {
      const url = link.match(/\((.*?)\)/)[1]
      if (url.includes("undefined") || url.includes("null")) {
        issues.push({
          type: "error",
          message: `Broken link found: ${link}`,
        })
      }
    })

    // Check line length
    const lines = content.split("\n")
    lines.forEach((line, idx) => {
      if (line.length > 120 && line.trim().length > 0) {
        issues.push({
          type: "info",
          message: `Line ${idx + 1} is long (${line.length} chars). Consider wrapping.`,
        })
      }
    })

    // Check for code blocks
    const codeBlocks = content.match(/```/g) || []
    if (codeBlocks.length % 2 !== 0) {
      issues.push({
        type: "error",
        message: "Unmatched code block markers. Check ``` pairs.",
      })
    }

    setValidationResults({
      total: issues.length,
      errors: issues.filter((i) => i.type === "error").length,
      warnings: issues.filter((i) => i.type === "warning").length,
      info: issues.filter((i) => i.type === "info").length,
      issues,
    })
  }

  return (
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
      <Box
        as="button"
        onClick={validateMarkdown}
        sx={{
          bg: "primary",
          color: "background",
          px: 3,
          py: 2,
          borderRadius: "6px",
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
          mb: validationResults ? 2 : 0,
          transition: "all 0.2s",
          "&:hover": {
            opacity: 0.9,
          },
        }}
      >
        ✓ Validate Markdown
      </Box>

      {validationResults && (
        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ bg: "background", p: 2, borderRadius: "6px" }}>
              <Box sx={{ fontSize: "12px", opacity: 0.7 }}>ERRORS</Box>
              <Box sx={{ fontSize: "24px", fontWeight: 700, color: "accent" }}>
                {validationResults.errors}
              </Box>
            </Box>
            <Box sx={{ bg: "background", p: 2, borderRadius: "6px" }}>
              <Box sx={{ fontSize: "12px", opacity: 0.7 }}>WARNINGS</Box>
              <Box sx={{ fontSize: "24px", fontWeight: 700, color: "secondary" }}>
                {validationResults.warnings}
              </Box>
            </Box>
            <Box sx={{ bg: "background", p: 2, borderRadius: "6px" }}>
              <Box sx={{ fontSize: "12px", opacity: 0.7 }}>INFO</Box>
              <Box sx={{ fontSize: "24px", fontWeight: 700, color: "primary" }}>
                {validationResults.info}
              </Box>
            </Box>
          </Box>

          {validationResults.issues.length > 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {validationResults.issues.map((issue, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 2,
                    bg: "background",
                    borderRadius: "6px",
                    borderLeft: "4px solid",
                    borderColor:
                      issue.type === "error"
                        ? "accent"
                        : issue.type === "warning"
                        ? "secondary"
                        : "primary",
                    display: "flex",
                    gap: 2,
                  }}
                >
                  <Box sx={{ fontWeight: 700, minWidth: "60px" }}>
                    {issue.type === "error"
                      ? "❌"
                      : issue.type === "warning"
                      ? "⚠️"
                      : "ℹ️"}
                  </Box>
                  <Box sx={{ fontSize: "14px" }}>{issue.message}</Box>
                </Box>
              ))}
            </Box>
          )}

          {validationResults.issues.length === 0 && (
            <Box
              sx={{
                p: 3,
                bg: "background",
                borderRadius: "6px",
                textAlign: "center",
                color: "primary",
                fontWeight: 600,
              }}
            >
              ✓ All checks passed! Your markdown looks good.
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
