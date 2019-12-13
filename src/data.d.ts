interface PostData {
  excerpt: string
  html: string
  timeToRead: number
  // manually added
  headings: any[]
  path: string
  frontmatter: {
    date: string
    tags: string[]
    title: string
  }
}

interface Post extends Omit<PostData, 'headings'> {
  headings?: number
}

interface AllMarkdownRemark {
  edges: {
    node: PostData
  }[]
}

interface QueryRes {
  allMarkdownRemark: AllMarkdownRemark
}

interface PageConf {
  count: number
  current: number
}
