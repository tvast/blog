import React, { useState } from "react"
import { Box, Container, Input, Textarea } from "theme-ui"
import Header from "../gatsby-theme-blog/components/header"
import SidebarMenu from "../gatsby-theme-blog/components/sidebar-menu"
import Footer from "../gatsby-theme-blog/components/footer"

export default function ContactPage({ location }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // mailto link for now, can be updated to use a service
    window.location.href = `mailto:theophile.vast@gmail.com?subject=Message from ${formData.name}&body=${formData.message}`
  }

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
            maxWidth: ["100%", "100%", "600px"],
            py: 4,
            px: [3, 3, 4],
          }}
        >
          <Box as="h1" sx={{ mb: 2, fontSize: 32, fontWeight: 700 }}>
            Get In Touch
          </Box>
          <Box as="p" sx={{ mb: 4, opacity: 0.9 }}>
            Have a question or want to discuss something? I'd love to hear from you!
          </Box>

          <Box
            as="form"
            onSubmit={handleSubmit}
            sx={{
              "& > div": {
                mb: 3,
              },
              "& label": {
                display: "block",
                mb: 1,
                fontWeight: 600,
                fontSize: "14px",
              },
              "& input, & textarea": {
                width: "100%",
                p: 2,
                border: "1px solid",
                borderColor: "muted",
                borderRadius: "6px",
                fontFamily: "body",
                fontSize: "14px",
                "&:focus": {
                  outline: "none",
                  borderColor: "primary",
                  boxShadow: "0 0 0 3px rgba(0, 208, 132, 0.1)",
                },
              },
              "& textarea": {
                minHeight: "150px",
                resize: "vertical",
              },
            }}
          >
            <Box>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Box>

            <Box>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Box>

            <Box>
              <label htmlFor="message">Message</label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Box>

            <Box
              as="button"
              type="submit"
              sx={{
                bg: "primary",
                color: "background",
                px: 4,
                py: 2,
                borderRadius: "6px",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                  opacity: 0.9,
                  transform: "translateY(-2px)",
                },
              }}
            >
              Send Message
            </Box>
          </Box>

          <Box sx={{ mt: 6, pt: 4, borderTop: "2px solid", borderColor: "muted" }}>
            <Box as="h3" sx={{ fontSize: 20, fontWeight: 700, mb: 2 }}>
              Other Ways to Reach Me
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <Box>
                <strong>Email:</strong>{" "}
                <Box as="a" href="mailto:theophile.vast@gmail.com" sx={{ color: "primary" }}>
                  theophile.vast@gmail.com
                </Box>
              </Box>
              <Box>
                <strong>Twitter:</strong>{" "}
                <Box as="a" href="https://twitter.com/theophile_vast" target="_blank" rel="noopener noreferrer" sx={{ color: "primary" }}>
                  @theophile_vast
                </Box>
              </Box>
              <Box>
                <strong>GitHub:</strong>{" "}
                <Box as="a" href="https://github.com/tvast" target="_blank" rel="noopener noreferrer" sx={{ color: "primary" }}>
                  @tvast
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
