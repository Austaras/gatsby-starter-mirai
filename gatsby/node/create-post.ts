import path from 'path'
import { Actions } from 'gatsby'

import { pick } from '../../src/utils'

export const createPost = (createPage: Actions['createPage'], posts: Post[]) => {
  const template = path.resolve('src/post/post.tsx')
  posts.forEach((post, index) => {
    const prev = index === 0 ? null : pick(posts[index - 1], 'path', 'frontmatter')
    const next = index === posts.length - 1 ? null : pick(posts[index + 1], 'path', 'frontmatter')
    createPage({
      path: post.path,
      component: template,
      context: { post, prev, next }
    })
  })
}
