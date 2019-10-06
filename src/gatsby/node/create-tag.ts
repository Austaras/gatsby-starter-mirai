import path from 'path'
import { Actions } from 'gatsby'

export const createTagPages = (createPage: Actions['createPage'], posts: Post[]) => {
  const tagTemplate = path.resolve(`src/tag.tsx`)
  const tagsTemplate = path.resolve(`src/tags/tags.tsx`)
  const tags = posts.reduce(
    (acc, post) => {
      if (!post.frontmatter.tags) {
        return acc
      }
      post.frontmatter.tags.forEach(tag => {
        if (!acc[tag]) {
          acc[tag] = []
        }
        acc[tag].push(post)
      })
      return acc
    },
    {} as Record<string, Post[]>
  )

  createPage({
    path: '/tag',
    component: tagsTemplate,
    context: { tags }
  })

  Object.keys(tags).forEach(tagName => {
    const posts = tags[tagName]
    createPage({
      path: `/tag/${tagName}`,
      component: tagTemplate,
      context: { tags, posts, tagName }
    })
  })
}
