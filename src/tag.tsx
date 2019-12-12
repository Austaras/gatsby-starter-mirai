import React from 'react'
import { Helmet } from 'react-helmet-async'

import { Layout, Timeline } from './common'
import './styles.scss'

interface Props {
  pageContext: {
    posts: Pick<Post, 'path' | 'frontmatter'>[]
    tagName: string
  }
}

const Tag = ({ pageContext: { posts, tagName } }: Props) => (
  <Layout>
    <Helmet>
      <title>Tag: {tagName}</title>
    </Helmet>
    <Timeline posts={posts} title={tagName} />
  </Layout>
)

export default Tag
