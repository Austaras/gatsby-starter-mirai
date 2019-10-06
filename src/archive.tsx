import React, { useEffect } from 'react'

import { Layout, Timeline } from './common'

interface Props {
  pageContext: {
    posts: Post[]
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
