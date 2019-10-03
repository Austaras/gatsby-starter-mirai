import React, { useEffect } from 'react'

import { Layout } from '../common'
import { Timeline } from '../common/timeline/timeline'

export default function Tag({ pageContext }) {
  const { post, tag } = pageContext
  useEffect(() => {
    document.title = `Tag: ${tag}`
  }, [])
  return (
    <Layout>
      <h1>Tags</h1>
      <Timeline post={post} />
    </Layout>
  )
}
