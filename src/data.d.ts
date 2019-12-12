interface Post {
  excerpt: string
  html: string
  timeToRead: number
  // manually added
  path: string
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

interface PageConf {
  count: number
  current: number
}
