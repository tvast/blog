import React from "react"
import { Link } from "gatsby"
import { Box, Container } from "theme-ui"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      as="footer"
      sx={{
        mt: 8,
        pt: 6,
        pb: 4,
        borderTop: "2px solid",
        borderColor: "muted",
        bg: "muted",
        color: "text",
      }}
    >
      <Container sx={{ maxWidth: "1200px" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: ["1fr", "1fr 1fr 1fr"],
            gap: 4,
            mb: 4,
          }}
        >
          {/* About Section */}
          <Box>
            <Box as="h4" sx={{ mb: 2, fontWeight: 700 }}>About</Box>
            <Box as="p" sx={{ fontSize: "14px", lineHeight: 1.6 }}>
              A developer's journey exploring web technologies, UX/UI design, and
              digital innovation.
            </Box>
          </Box>

          {/* Quick Links */}
          <Box>
            <Box as="h4" sx={{ mb: 2, fontWeight: 700 }}>Quick Links</Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                "& a": {
                  textDecoration: "none",
                  color: "text",
                  fontSize: "14px",
                  "&:hover": { color: "primary" },
                },
              }}
            >
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </Link>
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Articles
              </Link>
              <Link to="/about" style={{ color: "inherit", textDecoration: "none" }}>
                About
              </Link>
              <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>
                Contact
              </Link>
            </Box>
          </Box>

          {/* Social Links */}
          <Box>
            <Box as="h4" sx={{ mb: 2, fontWeight: 700 }}>Follow</Box>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                "& a": {
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  bg: "background",
                  color: "text",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  "&:hover": {
                    bg: "primary",
                    color: "background",
                  },
                },
              }}
            >
              <Box
                as="a"
                href="https://twitter.com/theophile_vast"
                target="_blank"
                rel="noopener noreferrer"
              >
                𝕏
              </Box>
              <Box
                as="a"
                href="https://github.com/tvast"
                target="_blank"
                rel="noopener noreferrer"
              >
                ⚙
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Copyright */}
        <Box
          sx={{
            textAlign: "center",
            pt: 4,
            borderTop: "1px solid",
            borderColor: "border",
            fontSize: "14px",
          }}
        >
          <Box as="p" sx={{ m: 0 }}>
            © {currentYear} Theophile Vast. All rights reserved. Built with Gatsby &
            React.
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
