import path from 'path'
import { Actions, CreatePagesArgs } from 'gatsby'

export const createAbout = async (createPage: Actions['createPage'], graphql: CreatePagesArgs['graphql']) => {
  const { errors, data } = await graphql<QueryRes>(`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { glob: "**/blog/about.md" } }) {
        edges {
          node {
            html
          }
        }
      }
    }
  `)
  if (errors) throw errors
  const template = path.resolve('src/about/index.tsx')
  const content = data!.allMarkdownRemark.edges[0].node.html

  createPage({
    path: '/about',
    component: template,
    context: { content }
  })
}
