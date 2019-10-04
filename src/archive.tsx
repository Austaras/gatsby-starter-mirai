import React, { useEffect } from 'react'

import { Layout } from './common'
import { Timeline } from './common/timeline/timeline'

export default function Archive({ pageContext }) {
  const { post } = pageContext

  useEffect(() => {
    document.title = `Archive`
  }, [])
  return (
    <Layout>
      <Timeline post={post} />
    </Layout>
  )
}
