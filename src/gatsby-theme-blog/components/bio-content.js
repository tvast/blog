import React, { Fragment } from "react"
import { Box } from "theme-ui"

/**
 * Change the content to add your own bio
 */

export default () => (
  <Fragment>
    Passionate about Javasript and UX UI{" "}
    <Box as="a" href="https://tvast.github.io/portfolio/" sx={{ color: "primary", textDecoration: "underline" }}>
      give a hint at my portfolio
    </Box>
    {` `}
  </Fragment>
)
