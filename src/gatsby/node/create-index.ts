import path from 'path'
import { Actions } from 'gatsby'

import { config } from '../../config'

export const createIndexPages = (createPage: Actions['createPage'], posts: Post[]) => {
  const limit = config.style.per_page
  const template = path.resolve(`src/index/index.tsx`)

  createPage({
    path: '/',
    component: template,
    context: {
      posts: posts.slice(0, limit)
    }
  })
}
