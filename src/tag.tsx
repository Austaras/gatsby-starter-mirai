import React, { useEffect } from 'react'

import { Layout, Timeline } from './common'
import './styles.scss'

interface Props {
  pageContext: {
    posts: Pick<Post, 'path' | 'frontmatter'>[]
    tagName: string
  }
}

export default function Tag({ pageContext }: Props) {
  const { posts, tagName } = pageContext
  useEffect(() => {
    document.title = `Tag: ${tagName}`
  }, [])
  return (
    <Layout>
      <Timeline posts={posts} title={tagName} />
    </Layout>
  )
}
