import path from 'path'
import { Actions } from 'gatsby'

export const createPost = (createPage: Actions['createPage'], posts: Post[]) => {
  const template = path.resolve('src/post/post.tsx')
  posts.forEach((post, index) => {
    const prev = index === 0 ? null : posts[index - 1]
    const next = index === posts.length - 1 ? null : posts[index + 1]
    createPage({
      path: post.path,
      component: template,
      context: { post, prev, next }
    })
  })
}
