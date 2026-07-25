import React, { useState } from "react"
import { Link } from "gatsby"
import { Box } from "theme-ui"

const menuItems = [
  { id: "home", title: "Home", path: "/", icon: "🏠" },
  { id: "knowledge", title: "Knowledge", path: "/knowledge/", icon: "📚" },
  { id: "about", title: "About", path: "/about", icon: "👤" },
  { id: "contact", title: "Contact", path: "/contact", icon: "💬" },
]

export default function Navigation({ location }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu toggle */}
      <Box
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          display: ["block", "none"],
          cursor: "pointer",
          fontSize: "24px",
          bg: "transparent",
          border: "none",
          p: 0,
        }}
      >
        ☰
      </Box>

      {/* Desktop Navigation */}
      <Box
        as="nav"
        sx={{
          display: ["none", "flex"],
          gap: "32px",
          alignItems: "center",
          "& a": {
            textDecoration: "none",
            fontWeight: 500,
            color: "text",
            transition: "color 0.2s",
            "&:hover": {
              color: "primary",
            },
          },
        }}
      >
        {menuItems.map((item) => (
          <Link key={item.id} to={item.path} style={{ textDecoration: "none" }}>
            <Box sx={{ color: "inherit", "&:hover": { color: "primary" } }}>
              {item.icon} {item.title}
            </Box>
          </Link>
        ))}
      </Box>

      {/* Mobile Navigation */}
      {isOpen && (
        <Box
          sx={{
            display: ["block", "none"],
            position: "absolute",
            top: "70px",
            right: 0,
            left: 0,
            bg: "background",
            borderBottom: "1px solid",
            borderColor: "muted",
            py: 3,
            px: 3,
            flexDirection: "column",
            gap: "16px",
            zIndex: 100,
            "& a": {
              display: "block",
              textDecoration: "none",
              color: "text",
              py: 2,
              borderBottom: "1px solid",
              borderColor: "muted",
              "&:hover": {
                color: "primary",
              },
            },
          }}
        >
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setIsOpen(false)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box sx={{ color: "inherit", "&:hover": { color: "primary" } }}>
                {item.icon} {item.title}
              </Box>
            </Link>
          ))}
        </Box>
      )}
    </>
  )
}
