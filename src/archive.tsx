import { Layout, SEO, Timeline } from '@/common'
import './styles.scss'

interface Props {
  pageContext: {
    posts: Pick<Post, 'frontmatter' | 'fields'>[]
  }
}
const Archive = ({ pageContext: { posts } }: Props) => (
  <Layout>
    <SEO title="Archive" noindex={true} />
    <Timeline posts={posts} />
  </Layout>
)

export default Archive
