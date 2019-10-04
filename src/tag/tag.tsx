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
      <Timeline post={post} title={tag}/>
    </Layout>
  )
}
