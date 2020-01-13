import path from 'path'
import { CreateBabelConfigArgs, CreatePagesArgs, CreateWebpackConfigArgs } from 'gatsby'

import { createAbout } from './create-about'
import { createIndexPages } from './create-index'
import { createPost } from './create-post'
import { createTagPages } from './create-tag'
import { generatePath } from './utils'

import { config } from '../../src/config'

export const createPages = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions

  createPage({
    path: '/404',
    component: path.resolve('src/404/index.tsx'),
    context: null
  })

  const { errors, data } = await graphql<QueryRes>(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { glob: "**/blog/posts/**/*.md" } }
      ) {
        edges {
          node {
            excerpt
            html
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
              }
            }
          }
        }
      }
    }
  `)
  if (errors) {
    return Promise.reject(errors)
  }

  const posts = data!.allMarkdownRemark.edges.map(({ node }) => {
    node.path = generatePath(node.frontmatter.title, new Date(node.frontmatter.date))
    return node
  })

  createTagPages(createPage, posts)
  createPost(createPage, posts)

  await Promise.all([createIndexPages(createPage, graphql), createAbout(createPage, graphql)])
}

export const onCreateWebpackConfig = ({ plugins, actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/i18n': path.resolve(__dirname, `../../src/i18n/${config.language}.yml`),
        '@': path.resolve(__dirname, '../../src')
      }
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-module-eval-source-map',
    plugins: [
      plugins.define({
        'process.env': { __IS_WEBPACK__: JSON.stringify(true) }
      })
    ]
  })
}
