interface Post {
  excerpt: string
  html: string
  id: string
  // manually added
  path: string
  fileAbsolutePath: string
  frontmatter: {
    date: string
    tags: string[]
    title: string
  }
}

interface AllMarkdownRemark {
  edges: {
    node: Post
  }[]
}

interface QueryRes {
  allMarkdownRemark: AllMarkdownRemark
}
