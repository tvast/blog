import React from "react"
import { Box } from "theme-ui"

export default function MarkdownRenderer({ html }) {
  return (
    <Box
      className="markdown-content"
      sx={{
        "& > *": {
          mb: 3,
        },
        "& h1, & h2, & h3, & h4, & h5, & h6": {
          fontWeight: 700,
          lineHeight: 1.2,
          mt: 4,
          mb: 2,
          scrollMarginTop: "100px",
          color: "heading",
        },
        "& h1": {
          fontSize: 32,
        },
        "& h2": {
          fontSize: 28,
        },
        "& h3": {
          fontSize: 24,
        },
        "& h4": {
          fontSize: 20,
        },
        "& h5": {
          fontSize: 18,
        },
        "& h6": {
          fontSize: 16,
        },
        "& p": {
          lineHeight: 1.8,
          mb: 3,
        },
        "& a": {
          color: "primary",
          textDecoration: "underline",
          cursor: "pointer",
          transition: "color 0.2s",
          "&:hover": {
            color: "secondary",
          },
        },
        "& strong": {
          fontWeight: 700,
        },
        "& em": {
          fontStyle: "italic",
        },
        // Inline code. Mirrors the preset's styles.inlineCode, which does not
        // apply automatically to remark-generated HTML.
        "& code": {
          fontFamily: "monospace",
          fontSize: "0.9em",
          bg: "highlight",
          color: "secondary",
          borderRadius: "0.3em",
          px: "0.2em",
          py: "0.15em",
        },
        // Fenced blocks use the preset's prism palette.
        "& pre": {
          fontFamily: "monospace",
          bg: "prism.background",
          color: "prism.var",
          p: 3,
          borderRadius: 4,
          overflowX: "auto",
          mb: 3,
          lineHeight: 1.5,
          tabSize: 4,
          hyphens: "none",
          code: {
            bg: "transparent",
            color: "inherit",
            px: 0,
            py: 0,
            fontSize: "inherit",
            whiteSpace: "pre",
          },
        },
        "& blockquote": {
          borderLeft: "4px solid",
          borderColor: "primary",
          pl: 3,
          py: 2,
          my: 3,
          fontStyle: "italic",
          opacity: 0.8,
          bg: "muted",
          borderRadius: "4px",
        },
        "& ul, & ol": {
          pl: 5,
          mb: 3,
        },
        "& li": {
          mb: 1,
          lineHeight: 1.8,
        },
        "& ul ul, & ol ol, & ul ol, & ol ul": {
          mt: 1,
          mb: 1,
        },
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: "8px",
          my: 3,
          border: "1px solid",
          borderColor: "border",
        },
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          mb: 3,
          border: "1px solid",
          borderColor: "border",
          borderRadius: "8px",
          overflow: "hidden",
          th: {
            bg: "muted",
            p: 2,
            textAlign: "left",
            fontWeight: 700,
            borderBottom: "2px solid",
            borderColor: "border",
          },
          td: {
            p: 2,
            borderBottom: "1px solid",
            borderColor: "border",
          },
          "tr:last-child td": {
            borderBottom: "none",
          },
        },
        "& hr": {
          border: "none",
          borderBottom: "2px solid",
          borderColor: "muted",
          my: 4,
        },
        // Prism token colors, sourced from the preset's colors.prism palette so
        // gatsby-theme-ui-preset stays the single source of truth for style.
        ".token.attr-name": { fontStyle: "italic", color: "prism.string" },
        ".token.comment": { color: "prism.comment" },
        ".token.string, .token.url": { color: "prism.string" },
        ".token.variable": { color: "prism.var" },
        ".token.number": { color: "prism.number" },
        ".token.builtin, .token.char, .token.constant, .token.function": {
          color: "prism.constant",
        },
        ".token.punctuation, .token.selector, .token.doctype": {
          color: "prism.punctuation",
        },
        ".token.class-name": { color: "prism.className" },
        ".token.tag, .token.operator, .token.keyword": { color: "prism.tag" },
        ".token.boolean": { color: "prism.boolean" },
        ".token.property": { color: "prism.property" },
        ".token.namespace": { color: "prism.namespace" },
        ".gatsby-highlight-code-line": { background: "prism.highlight" },
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
