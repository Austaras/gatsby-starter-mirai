import { Layout, SEO, Timeline } from './common'
import './styles.scss'

interface Props {
  pageContext: {
    posts: Pick<Post, 'fields' | 'frontmatter'>[]
    tagName: string
  }
}

export const Head = ({ pageContext: { tagName } }: Props) => (
  <SEO title={`Tag: ${tagName}`} noindex={true} path={`/tags/${tagName}`} />
)

const Tag = ({ pageContext: { posts, tagName } }: Props) => (
  <Layout>
    <Timeline posts={posts} title={tagName} />
  </Layout>
)

export default Tag
