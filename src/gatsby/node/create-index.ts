import path from 'path'
import { Actions } from 'gatsby'

import { config } from '../../config'
import { pick } from '../../utils'

export const createIndexPages = (createPage: Actions['createPage'], posts: Post[]) => {
  const limit = config.style.per_page
  const template = path.resolve(`src/index/index.tsx`)
  const count = Math.ceil(posts.length / limit)
  const relPosts = posts.map(post => pick(post, 'excerpt', 'frontmatter', 'path'))

  createPage({
    path: '/archive',
    component: path.resolve('src/archive.tsx'),
    context: { posts: relPosts }
  })

  createPage({
    path: '/',
    component: template,
    context: {
      posts: relPosts.slice(0, limit),
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
        posts: relPosts.slice(limit * (i - 1), limit * i),
        page: {
          current: i,
          count
        }
      }
    })
  }
}
