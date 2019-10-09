import React, { useEffect } from 'react'

import { Layout, Timeline } from './common'
import './styles.scss'

interface Props {
  pageContext: {
    posts: Pick<Post, 'frontmatter' | 'path'>[]
  }
}

export default function Archive({ pageContext }: Props) {
  const { posts } = pageContext

  useEffect(() => {
    document.title = 'Archive'
  }, [])
  return (
    <Layout>
      <Timeline posts={posts} />
    </Layout>
  )
}
