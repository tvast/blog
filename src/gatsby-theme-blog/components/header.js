import React from "react"
import { Link } from "gatsby"
import { Box, Container } from "theme-ui"
import Navigation from "./navigation"

export default function Header({ location }) {
  return (
    <Box
      as="header"
      sx={{
        py: 3,
        borderBottom: "2px solid",
        borderColor: "muted",
        mb: 4,
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(10px)",
        bg: "headerBg",
      }}
    >
      <Container sx={{ maxWidth: "1200px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box
              as="h1"
              sx={{
                m: 0,
                fontSize: "24px",
                fontWeight: "bold",
                color: "heading",
                "&:hover": { color: "primary" },
              }}
            >
              A Developer's Journey
            </Box>
          </Link>
          <Navigation location={location} />
        </Box>
      </Container>
    </Box>
  )
}
