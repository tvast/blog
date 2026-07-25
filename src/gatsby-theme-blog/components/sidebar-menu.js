import React, { useState } from "react"
import { Link } from "gatsby"
import { Box } from "theme-ui"

export default function SidebarMenu({ location, posts }) {
  const [expandedMenus, setExpandedMenus] = useState({ posts: true })

  const toggleSubmenu = (id) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const menuItems = [
    { id: "home", title: "Home", path: "/", icon: "🏠" },
    {
      id: "posts",
      title: "Articles",
      path: "/",
      icon: "📚",
      submenu: posts || [],
    },
    { id: "about", title: "About", path: "/about", icon: "👤" },
    { id: "contact", title: "Contact", path: "/contact", icon: "💬" },
  ]

  return (
    <Box
      as="aside"
      sx={{
        display: ["none", "none", "block"],
        width: "250px",
        position: "sticky",
        top: "100px",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
        pr: 4,
        pb: 4,
        borderRight: "1px solid",
        borderColor: "muted",
        scrollBehavior: "smooth",
      }}
    >
      <Box as="h3" sx={{ mb: 3, fontSize: "16px", textTransform: "uppercase", fontWeight: 700 }}>
        Navigation
      </Box>

      <Box sx={{ "& > div": { mb: 2 } }}>
        {menuItems.map((item) => (
          <Box key={item.id}>
            <Link
              to={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box
                onClick={() => item.submenu && toggleSubmenu(item.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: item.submenu ? "pointer" : "default",
                  py: 2,
                  px: 2,
                  borderRadius: "6px",
                  bg:
                    location?.pathname === item.path ? "highlight" : "transparent",
                  transition: "all 0.2s",
                  "&:hover": {
                    bg: "muted",
                  },
                }}
              >
                <span>{item.icon}</span>
                <span>{item.title}</span>
                {item.submenu && item.submenu.length > 0 && (
                  <span sx={{ fontSize: "12px", ml: "auto" }}>
                    {expandedMenus[item.id] ? "▼" : "▶"}
                  </span>
                )}
              </Box>
            </Link>

            {item.submenu &&
              item.submenu.length > 0 &&
              expandedMenus[item.id] && (
                <Box sx={{ pl: 4, borderLeft: "2px solid", borderColor: "primary" }}>
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.path}
                      to={subitem.path}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Box
                        sx={{
                          display: "block",
                          py: 1.5,
                          px: 2,
                          textDecoration: "none",
                          color: "text",
                          fontSize: "14px",
                          borderRadius: "4px",
                          mb: 1,
                          transition: "all 0.2s",
                          "&:hover": {
                            bg: "muted",
                            pl: 3,
                          },
                        }}
                      >
                        <span sx={{ mr: 1 }}>{subitem.icon}</span>
                        {subitem.title}
                      </Box>
                    </Link>
                  ))}
                </Box>
              )}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
