import path from 'path'
import { Actions } from 'gatsby'

import { config } from '../../config'

export const createIndexPages = (createPage: Actions['createPage'], posts: Post[]) => {
  const limit = config.style.per_page
  const template = path.resolve(`src/index/index.tsx`)
  const count = Math.ceil(posts.length / limit)

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
