import path from 'path'
import { Actions } from 'gatsby'

import { pick } from '../../src/utils'
import { generateTree } from './utils'

export const createPost = (createPage: Actions['createPage'], posts: PostData[]) => {
  const template = path.resolve('src/post/index.tsx')
  posts.forEach((post, index) => {
    const { headings, ...rest } = post
    if (headings.length > 0) (rest as Post).headings = generateTree(headings)
    const context: any = { post: rest }
    if (index > 0) {
      const prev = posts[index - 1]
      context.prev = pick(prev, 'path')
      context.prev.title = prev.frontmatter.title
    }
    if (index < posts.length - 1) {
      const next = posts[index + 1]
      context.next = pick(next, 'path')
      context.next.title = next.frontmatter.title
    }
    createPage({
      path: post.path,
      component: template,
      context
    })
  })
}
