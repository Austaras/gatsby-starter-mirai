import path from 'path'
import { Actions } from 'gatsby'

export const createAbout = (createPage: Actions['createPage'], pages: Record<string, Post>) => {
  const page = pages.about
  if (!page) return
  const template = path.resolve(`src/about/about.tsx`)

  createPage({
    path: '/about',
    component: template,
    context: {
      content: page
    }
  })
}
