import { graphql } from 'gatsby'

import comp from '../index/index'

export default comp

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      posts: edges {
        post: node {
          excerpt(format: HTML)
          id
          frontmatter {
            title
            date
            path
          }
        }
      }
    }
  }
`
