import path from 'path'
import { Actions, CreatePagesArgs, CreateWebpackConfigArgs } from 'gatsby'

import { generate } from './path'

const createTagPages = (createPage: Actions['createPage'], posts: Post[]) => {
  const tagTemplate = path.resolve(`src/tag.tsx`)
  const tagsTemplate = path.resolve(`src/tags/tags.tsx`)
  const tags: Record<string, Post[]> = {}

  posts.forEach(post => {
    if (post.frontmatter.tags) {
      post.frontmatter.tags.forEach(tag => {
        if (!tags[tag]) {
          tags[tag] = []
        }
        tags[tag].push(post)
      })
    }
  })

  createPage({
    path: '/tag',
    component: tagsTemplate,
    context: {
      tags
    }
  })

  Object.keys(tags).forEach(tagName => {
    const posts = tags[tagName]
    createPage({
      path: `/tag/${tagName}`,
      component: tagTemplate,
      context: {
        tags,
        posts,
        tagName
      }
    })
  })
}

export const createPages = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions

  createPage({
    path: '/404',
    component: path.resolve('src/404/404.tsx'),
    context: null
  })

  const blogPostTemplate = path.resolve('src/post/post.tsx')
  const { errors, data } = await graphql<QueryRes>(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            excerpt(format: HTML)
            html
            id
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

  const posts = data!.allMarkdownRemark.edges.map(edge => edge.node)
  posts.forEach(post => {
    post.path = generate(post.frontmatter.title, new Date(post.frontmatter.date))
  })

  createTagPages(createPage, posts)
  createPage({
    path: '/archive',
    component: path.resolve('src/archive.tsx'),
    context: {
      posts
    }
  })

  createPage({
    path: '/',
    component: path.resolve('src/index/index.tsx'),
    context: {
      posts
    }
  })

  // Create pages for each markdown file.
  posts.forEach((post, index) => {
    const prev = index === 0 ? null : posts[index - 1]
    const next = index === posts.length - 1 ? null : posts[index + 1]
    createPage({
      path: post.path,
      component: blogPostTemplate,
      context: {
        post,
        prev,
        next
      }
    })
  })

  return posts
}

export const onCreateWebpackConfig = ({ plugins, actions }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        'process.env': { __IS_WEBPACK__: JSON.stringify(true) }
      })
    ]
  })
}
