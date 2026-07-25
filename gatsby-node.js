const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

/**
 * The knowledge tree is a dump of plugin/skill docs with wildly inconsistent
 * frontmatter: ~4200 of 4467 files have no `title` at all, and a handful of
 * template files use `title: {{TITLE}}`, which YAML parses as a MAP rather than
 * a string. Left alone that makes Gatsby throw
 *
 *   String cannot represent value: { [object Object]: null }
 *
 * so `title` gets an explicit resolver that coerces anything non-string to null
 * and lets the slug-derived fallback in onCreateNode take over.
 */
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  createTypes([
    schema.buildObjectType({
      name: `MarkdownRemarkFrontmatter`,
      fields: {
        title: {
          type: `String`,
          resolve: source =>
            typeof source.title === `string` && source.title.trim()
              ? source.title
              : null,
        },
        date: {
          type: `Date`,
          extensions: { dateformat: {} },
          resolve: source => {
            const d = source.date
            if (d instanceof Date) return d
            if (typeof d === `string` || typeof d === `number`) {
              const parsed = new Date(d)
              return Number.isNaN(parsed.valueOf()) ? null : parsed
            }
            return null
          },
        },
      },
    }),
  ])
}

/** "image_processing-timm.md" -> "Image Processing Timm" */
const humanize = basename =>
  basename
    .replace(/[-_]+/g, ` `)
    .replace(/\s+/g, ` `)
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase())

/** First markdown heading in the body, if any. */
const firstHeading = raw => {
  if (!raw) return null
  const withoutFrontmatter = raw.replace(/^---\n[\s\S]*?\n---\n?/, ``)
    const match = withoutFrontmatter.match(/^#{1,3}\s+(.+)$/m)
  if (!match) return null
  const heading = match[1].trim()
  // Ignore template placeholders like "# {{TITLE}}"
  return /\{\{.*\}\}/.test(heading) ? null : heading
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type !== `MarkdownRemark`) return

  const { createNodeField } = actions
  const fileNode = getNode(node.parent)
  const collection = fileNode?.sourceInstanceName === `knowledge` ? `knowledge` : `posts`

  const relative = createFilePath({ node, getNode, basePath: `content` })
  const slug = collection === `knowledge` ? `/knowledge${relative}` : relative

  // Precedence: real frontmatter title -> first body heading -> humanized filename
  const frontmatterTitle =
    typeof node.frontmatter?.title === `string` && node.frontmatter.title.trim()
      ? node.frontmatter.title.trim()
      : null

  const displayTitle =
    frontmatterTitle ||
    firstHeading(node.internal.content) ||
    humanize(fileNode?.name || `untitled`)

  createNodeField({ node, name: `slug`, value: slug })
  createNodeField({ node, name: `collection`, value: collection })
  createNodeField({ node, name: `displayTitle`, value: displayTitle })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
            collection
            displayTitle
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error querying markdown for page creation`, result.errors)
    return
  }

  const postTemplate = path.resolve(`./src/templates/blog-post.js`)
  const knowledgeTemplate = path.resolve(`./src/templates/knowledge-page.js`)

  const nodes = result.data.allMarkdownRemark.nodes
  let posts = 0
  let knowledge = 0

  nodes.forEach(node => {
    const { slug, collection } = node.fields
    if (!slug) return

    createPage({
      path: slug,
      component: collection === `knowledge` ? knowledgeTemplate : postTemplate,
      context: { slug, collection },
    })

    collection === `knowledge` ? knowledge++ : posts++
  })

  reporter.info(`Created ${posts} post pages and ${knowledge} knowledge pages`)
}
