interface PostData {
  excerpt: string
  html: string
  timeToRead: number
  // manually added
  headings: {
    depth: number
    value: string
  }[]
  path: string
  frontmatter: {
    date: string
    tags: string[]
    title: string
  }
  parent: {
    mtimeMs: number
    name: string
  }
}

interface TOCTree {
  content: string
  hash: string
  children?: TOCTree[]
}

interface Post extends Omit<PostData, 'headings'> {
  headings?: TOCTree[]
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
