import path from 'path'
import { Actions } from 'gatsby'

import { pick } from '../../utils'

export const createTagPages = (createPage: Actions['createPage'], posts: Post[]) => {
  const tagTemplate = path.resolve(`src/tag.tsx`)
  const tagsTemplate = path.resolve(`src/tags/tags.tsx`)
  const tags: Record<string, Pick<Post, 'path' | 'frontmatter'>[]> = {}
  const tagsLen: Record<string, number> = {}
  for (const post of posts) {
    if (!post.frontmatter.tags) {
      continue
    }
    post.frontmatter.tags.forEach(tag => {
      if (!tags[tag]) {
        tags[tag] = []
      }
      tags[tag].push(pick(post, 'path', 'frontmatter'))
      if (!tagsLen[tag]) {
        tagsLen[tag] = 0
      }
      tagsLen[tag]++
    })
  }

  createPage({
    path: '/tag',
    component: tagsTemplate,
    context: { tagsLen }
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
