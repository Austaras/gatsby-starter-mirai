import path from 'path'
import { CreatePagesArgs, CreateWebpackConfigArgs, CreateNodeArgs } from 'gatsby'

import { createAbout } from './create-about'
import { createIndexPages } from './create-index'
import { createPost } from './create-post'
import { createTagPages } from './create-tag'
import { generatePath } from './utils'

import { CONFIG } from '../../src/config'

export const createPages = async ({ actions: { createPage }, graphql }: CreatePagesArgs) => {
  createPage({
    path: '/404',
    component: path.resolve('src/404/index.tsx'),
    context: null
  })

  const { errors, data } = await graphql<QueryRes>(`
    {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { fileAbsolutePath: { glob: "**/blog/posts/**/*.md" } }
      ) {
        edges {
          node {
            excerpt
            html
            fields {
              path
            }
            headings {
              depth
              value
            }
            timeToRead
            frontmatter {
              date
              tags
              title
            }
            parent {
              ... on File {
                mtimeMs
                name
              }
            }
          }
        }
      }
    }
  `)
  if (errors) {
    throw errors
  }

  const posts = data!.allMarkdownRemark.edges.map(({ node }) => node)

  createTagPages(createPage, posts)
  createPost(createPage, posts)

  await Promise.all([createIndexPages(createPage, graphql), createAbout(createPage, graphql)])
}

export const onCreateWebpackConfig = ({ plugins, actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/i18n': path.resolve(__dirname, `../../src/i18n/${CONFIG.language}.yml`),
        '@': path.resolve(__dirname, '../../src')
      }
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'eval-cheap-module-source-map',
    plugins: [
      plugins.define({
        'process.env.__IS_WEBPACK__': JSON.stringify(true)
      })
    ]
  })
}

export const onCreateNode = ({ node, actions }: CreateNodeArgs) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = generatePath(node as unknown as PostData)
    createNodeField({
      node,
      name: 'path',
      value
    })
  }
}
