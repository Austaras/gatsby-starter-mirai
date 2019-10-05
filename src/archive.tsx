import React, { useEffect } from 'react'

import { Layout, Timeline } from './common'

export default function Archive({ pageContext }) {
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
