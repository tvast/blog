// Dynamic menu structure generated from blog posts
export const menuItems = [
  {
    id: "home",
    title: "Home",
    path: "/",
    icon: "🏠",
  },
  {
    id: "posts",
    title: "Articles",
    path: "/",
    icon: "📚",
    submenu: [
      {
        title: "Begining",
        path: "/begining",
        date: "2019-07-03",
        icon: "🚀",
      },
      {
        title: "Managing your developer knowledge",
        path: "/developer-knowledge",
        date: "2019-08-10",
        icon: "🧠",
      },
      {
        title: "Redesign transport order monitoring app",
        path: "/redesign-transport-order-monitoring-app",
        date: "2019-09-10",
        icon: "🎯",
      },
      {
        title: "A new challenge",
        path: "/a-new-challenge",
        date: "2019-12-12",
        icon: "✈️",
      },
      {
        title: "Goodbye for loop",
        path: "/goodbye-for-loop",
        date: "2021-11-30",
        icon: "🔄",
      },
    ],
  },
  {
    id: "about",
    title: "About",
    path: "/about",
    icon: "👤",
  },
  {
    id: "contact",
    title: "Contact",
    path: "/contact",
    icon: "💬",
  },
]

export const getMenuItemByPath = (path) => {
  return menuItems.find((item) => item.path === path)
}

export const getAllPosts = () => {
  const articlesMenu = menuItems.find((item) => item.id === "posts")
  return articlesMenu ? articlesMenu.submenu : []
}
