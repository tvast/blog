import React from "react"
import { Box, Container } from "theme-ui"
import Header from "./header"
import SidebarMenu from "./sidebar-menu"
import Footer from "./footer"

export default function Layout({ children, location }) {
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

      <Box
        sx={{
          display: "flex",
          flex: 1,
          maxWidth: "1400px",
          mx: "auto",
          width: "100%",
        }}
      >
        <SidebarMenu location={location} />

        <Container
          sx={{
            flex: 1,
            maxWidth: ["100%", "100%", "900px"],
            py: 4,
            px: [3, 3, 4],
          }}
        >
          <Box
            sx={{
              minHeight: "400px",
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
