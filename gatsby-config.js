module.exports = {
  pathPrefix: "/blog",

  siteMetadata: {
    title: "A developer journey",
    author: "Theophile Vast",
    description: "Journey of a front end developer in the digital world",
    siteUrl: "https://tvast.github.io/blog",
    social: [
      {
        name: "twitter",
        url: "https://twitter.com/theophile_vast",
      },
      {
        name: "github",
        url: "https://github.com/tvast",
      },
    ],
  },

  plugins: [
    // Provides ThemeUIProvider at the root; shadows src/gatsby-plugin-theme-ui/index.js
    "./src/packages/gatsby-theme-ui-preset",

    // Real blog articles. The knowledge dump lives under content/posts/knowledge,
    // so it is excluded here and sourced separately below.
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/content/posts`,
        ignore: [`**/knowledge/**`],
      },
    },

    // Knowledge base. content/knowledge is a duplicate copy of this tree and is
    // deliberately NOT sourced, so pages are not generated twice.
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "knowledge",
        path: `${__dirname}/content/posts/knowledge`,
      },
    },

    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: { offsetY: 100 },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: { maxWidth: 800 },
          },
        ],
      },
    },
  ],
};