import React from "react"
import { Box, Container } from "theme-ui"
import Header from "../gatsby-theme-blog/components/header"
import SidebarMenu from "../gatsby-theme-blog/components/sidebar-menu"
import Footer from "../gatsby-theme-blog/components/footer"

export default function AboutPage({ location }) {
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
          <Box as="h1" sx={{ mb: 4, fontSize: 32, fontWeight: 700 }}>
            About Me
          </Box>

          <Box
            sx={{
              "& p": {
                mb: 3,
                lineHeight: 1.8,
              },
              "& h2": {
                mt: 4,
                mb: 2,
                fontSize: 24,
                fontWeight: 700,
              },
              "& a": {
                color: "primary",
                textDecoration: "underline",
              },
            }}
          >
            <Box as="p">
              Hi! I'm Theophile Vast, a passionate frontend developer with a keen
              interest in creating beautiful, functional user experiences.
            </Box>

            <Box as="h2">What I Do</Box>
            <Box as="p">
              I specialize in building modern web applications using React, JavaScript,
              and cutting-edge frontend technologies. I'm particularly interested in:
            </Box>
            <ul>
              <li>Frontend Architecture & Design Systems</li>
              <li>User Experience & UI Design</li>
              <li>Web Performance Optimization</li>
              <li>Developer Tools & Workflow</li>
            </ul>

            <Box as="h2">My Journey</Box>
            <Box as="p">
              Through this blog, I share knowledge and insights from my experience as a
              developer. From discovering new technologies to mastering best practices,
              every article is a step in my continuous learning journey.
            </Box>

            <Box as="h2">Let's Connect</Box>
            <Box as="p">
              Feel free to reach out on{" "}
              <Box as="a" href="https://twitter.com/theophile_vast" sx={{ color: "primary" }}>
                Twitter
              </Box>
              {" "}or check out my work on{" "}
              <Box as="a" href="https://github.com/tvast" sx={{ color: "primary" }}>
                GitHub
              </Box>
              .
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
