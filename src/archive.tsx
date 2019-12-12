import React from 'react'
import { Helmet } from 'react-helmet-async'

import { Layout, Timeline } from '@/common'
import './styles.scss'

interface Props {
  pageContext: {
    posts: Pick<Post, 'frontmatter' | 'path'>[]
  }
}
const Archive = ({ pageContext: { posts } }: Props) => (
  <Layout>
    <Helmet>
      <title>Archive</title>
    </Helmet>
    <Timeline posts={posts} />
  </Layout>
)

export default Archive
