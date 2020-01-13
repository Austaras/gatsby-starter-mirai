import path from 'path'
import { Actions, CreatePagesArgs } from 'gatsby'

import { generatePath } from './utils'
import { config } from '../../src/config'
import { pick } from '../../src/utils'

export const createIndexPages = async (
  createPage: Actions['createPage'],
  graphql: CreatePagesArgs['graphql']
) => {
  const limit = config.style.per_page
  const template = path.resolve('src/index/index.tsx')

  const { errors, data } = await graphql<QueryRes>(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { glob: "**/blog/posts/**/*.md" } }
      ) {
        edges {
          node {
            excerpt(format: HTML)
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
  const count = Math.ceil(posts.length / limit)

  createPage({
    path: '/archive',
    component: path.resolve('src/archive.tsx'),
    context: {
      posts: posts.map(post => pick(post, 'frontmatter', 'path'))
    }
  })

  createPage({
    path: '/',
    component: template,
    context: {
      posts: posts.slice(0, limit),
      page: {
        current: 1,
        count
      }
    }
  })

  if (count === 1) return

  for (let i = 1; i <= count; i++) {
    createPage({
      path: `/page/${i}`,
      component: template,
      context: {
        posts: posts.slice(limit * (i - 1), limit * i),
        page: {
          current: i,
          count
        }
      }
    })
  }
}
