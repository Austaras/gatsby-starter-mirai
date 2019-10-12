interface PostData {
  excerpt: string
  html: string
  timeToRead: number
  // manually added
  path: string
  fileAbsolutePath: string
  frontmatter: {
    date: string
    tags: string[]
    title: string
  }
}

type Post = Pick<PostData, Exclude<keyof PostData, 'fileAbsolutePath'>>

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
