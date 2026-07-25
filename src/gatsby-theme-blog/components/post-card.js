import React from "react"
import { Link } from "gatsby"
import { Box } from "theme-ui"

export default function PostCard({ title, date, path, excerpt, icon }) {
  const formattedDate = date ? new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : null

  return (
    <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
      <Box
        sx={{
          p: 4,
          border: "1px solid",
          borderColor: "muted",
          borderRadius: "8px",
          bg: "background",
          transition: "all 0.3s ease",
          cursor: "pointer",
          height: "100%",
          "&:hover": {
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
            borderColor: "primary",
            transform: "translateY(-4px)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
          <Box sx={{ fontSize: "32px" }}>{icon}</Box>
          <Box sx={{ flex: 1 }}>
            <Box
              as="h3"
              sx={{
                m: 0,
                mb: 1,
                fontSize: "20px",
                color: "heading",
                "&:hover": { color: "primary" },
              }}
            >
              {title}
            </Box>
            {formattedDate && (
              <Box
                sx={{
                  fontSize: "14px",
                  color: "text",
                  opacity: 0.7,
                }}
              >
                {formattedDate}
              </Box>
            )}
          </Box>
        </Box>

        {excerpt && (
          <Box
            as="p"
            sx={{
              m: 0,
              mb: 3,
              fontSize: "14px",
              lineHeight: 1.6,
              color: "text",
              opacity: 0.8,
            }}
          >
            {excerpt}
          </Box>
        )}

        <Box
          sx={{
            display: "inline-block",
            mt: 2,
            py: 2,
            px: 3,
            bg: "primary",
            color: "background",
            textDecoration: "none",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s",
            "&:hover": {
              opacity: 0.9,
              transform: "translateX(4px)",
            },
          }}
        >
          Read More →
        </Box>
      </Box>
    </Link>
  )
}
