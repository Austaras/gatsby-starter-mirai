import path from 'path'
import { Actions } from 'gatsby'

import { pick } from '../../src/utils'

export const createPost = (createPage: Actions['createPage'], posts: PostData[]) => {
  const template = path.resolve('src/post/page.tsx')
  posts.forEach((post, index) => {
    const {headings, ...rest} = post
    if (headings.length > 0) (rest as Post).headings = 1
    const prev = index === 0 ? null : pick(posts[index - 1], 'path', 'frontmatter')
    const next = index === posts.length - 1 ? null : pick(posts[index + 1], 'path', 'frontmatter')
    createPage({
      path: post.path,
      component: template,
      context: { post, prev, next }
    })
  })
}
