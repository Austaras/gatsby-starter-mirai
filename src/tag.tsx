import React, { useEffect } from 'react'

import { Layout, Timeline } from './common'

export default function Tag({ pageContext }) {
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
