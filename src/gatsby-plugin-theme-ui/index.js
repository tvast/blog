/**
 * theme-ui theme, shadowed by gatsby-plugin-theme-ui.
 *
 * The vendored gatsby-theme-ui-preset (src/gatsby-theme-blog/) is the source of
 * the base style: colors, the prism syntax-highlighting palette, and the
 * pre/code/inlineCode/a/blockquote styles. Everything below only ADDS the scales
 * and tokens this site's components reference and the preset does not define.
 *
 * Nested selectors must be real CSS (`&:hover`). `_hover`/`_dark` are Chakra
 * idioms and are silently ignored by theme-ui.
 */
const preset = require("../gatsby-theme-blog/src/index")

const accent = `#ff7675`

const theme = {
  ...preset,

  colors: {
    ...preset.colors,

    // Tokens the components use that the preset does not define.
    surface: `#f8f9fa`,
    border: `hsla(0, 0%, 0%, 0.15)`,
    accent,
    // Translucent sticky-header backdrop; flips with the color mode.
    headerBg: `rgba(255, 255, 255, 0.95)`,

    modes: {
      ...preset.colors.modes,
      dark: {
        ...preset.colors.modes.dark,
        surface: `#2d2a35`,
        border: `hsla(0, 0%, 100%, 0.18)`,
        accent,
        headerBg: `rgba(35, 33, 41, 0.95)`,
      },
    },
  },

  // Scales the preset omits.
  space: [0, 4, 8, 16, 24, 32, 48, 64, 96, 128, 256],
  breakpoints: [`640px`, `768px`, `1024px`, `1280px`],
  fontSizes: [12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 56, 64],
  fontWeights: { body: 400, heading: 700, bold: 700 },
  lineHeights: { body: 1.6, heading: 1.25 },
  radii: [0, 4, 6, 8, 12, 16, 20, 24, 32],
  shadows: {
    sm: `0 1px 3px 0 rgb(0 0 0 / 0.1)`,
    md: `0 8px 12px -2px rgb(0 0 0 / 0.1)`,
    lg: `0 12px 16px -2px rgb(0 0 0 / 0.1)`,
  },

  sizes: {
    ...preset.sizes,
    full: `100%`,
  },

  styles: {
    ...preset.styles,
    root: {
      ...preset.styles.root,
      lineHeight: `body`,
      color: `text`,
      backgroundColor: `background`,
      scrollBehavior: `smooth`,
    },
    a: {
      ...preset.styles.a,
      textDecoration: `none`,
      cursor: `pointer`,
      transition: `color 0.2s ease`,
      "&:hover": { textDecoration: `underline` },
    },
    h1: { fontFamily: `heading`, fontWeight: `heading`, lineHeight: `heading`, fontSize: [5, 6, 7] },
    h2: { fontFamily: `heading`, fontWeight: `heading`, lineHeight: `heading`, fontSize: [4, 5, 6] },
    h3: { fontFamily: `heading`, fontWeight: `heading`, lineHeight: `heading`, fontSize: [3, 4, 5] },
    h4: { fontFamily: `heading`, fontWeight: `heading`, lineHeight: `heading`, fontSize: [2, 3, 4] },
  },
}

module.exports = theme
