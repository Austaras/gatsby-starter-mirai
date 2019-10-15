import path from 'path'
import { CreatePagesArgs, CreateWebpackConfigArgs } from 'gatsby'

import { config } from '../../config'
import { omit } from '../../utils'
import { createAbout } from './create-about'
import { createIndexPages } from './create-index'
import { createPost } from './create-post'
import { createTagPages } from './create-tag'
import { generate } from './path'

export const createPages = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions

  createPage({
    path: '/404',
    component: path.resolve('src/404/404.tsx'),
    context: null
  })

  const { errors, data } = await graphql<QueryRes>(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            excerpt(format: HTML)
            html
            tableOfContents
            timeToRead
            fileAbsolutePath
            frontmatter {
              date
              tags
              title
            }
          }
        }
      }
    }
  `)
  if (errors) {
    return Promise.reject(errors)
  }

  const mds = data!.allMarkdownRemark.edges.map(({ node }) => {
    node.path = generate(node.frontmatter.title, new Date(node.frontmatter.date))
    return node
  })

  // FIXME:
  const postPath = `${process.cwd()}/blog/posts`

  const posts: Post[] = []
  const pages: Record<string, Post> = {}

  for (const md of mds) {
    if (md.fileAbsolutePath.startsWith(postPath)) {
      posts.push(omit(md, 'fileAbsolutePath'))
    } else {
      const name = md.fileAbsolutePath
        .split('\\')
        .pop()!
        .split('/')
        .pop()!
        .split('.')
        .shift()!
      pages[name] = omit(md, 'fileAbsolutePath')
    }
  }

  createAbout(createPage, pages)
  createTagPages(createPage, posts)
  createIndexPages(createPage, posts)
  createPost(createPage, posts)

  // Create pages for each markdown file.

  return posts
}

export const onCreateWebpackConfig = ({ plugins, actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/i18n': path.resolve(__dirname, `../../i18n/${config.language}.yml`),
        '@': path.resolve(__dirname, '../..')
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
