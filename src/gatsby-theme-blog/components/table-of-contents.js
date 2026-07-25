import React, { useState } from "react"
import { Box } from "theme-ui"

export default function TableOfContents({ headings }) {
  const [isOpen, setIsOpen] = useState(true)

  if (!headings || headings.length === 0) {
    return null
  }

  // Filter headings to only h2 and h3
  const filteredHeadings = headings.filter((h) => h.depth === 2 || h.depth === 3)

  if (filteredHeadings.length === 0) {
    return null
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
        maxWidth: "100%",
      }}
    >
      <Box
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "16px",
          mb: isOpen ? 2 : 0,
        }}
      >
        <span>{isOpen ? "▼" : "▶"}</span>
        <span>Table of Contents</span>
      </Box>

      {isOpen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {filteredHeadings.map((heading) => (
            <Box
              key={heading.id}
              as="a"
              href={`#${heading.id}`}
              sx={{
                textDecoration: "none",
                color: "primary",
                pl: heading.depth === 3 ? 4 : 2,
                py: 1,
                fontSize: "14px",
                transition: "all 0.2s",
                "&:hover": {
                  color: "secondary",
                  pl: heading.depth === 3 ? 5 : 3,
                },
              }}
            >
              {heading.value}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
