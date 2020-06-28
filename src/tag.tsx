import React from 'react'

import { Layout, SEO, Timeline } from './common'
import './styles.scss'

interface Props {
  pageContext: {
    posts: Pick<Post, 'path' | 'frontmatter'>[]
    tagName: string
  }
}

const Tag = ({ pageContext: { posts, tagName } }: Props) => (
  <Layout>
    <SEO title={`Tag: ${tagName}`} noindex={true} path={`/tags/${tagName}`} />
    <Timeline posts={posts} title={tagName} />
  </Layout>
)

export default Tag
