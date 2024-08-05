import { Layout, SEO, Timeline } from '@/common'
import './styles.scss'

export const Head = () => <SEO title="Archive" noindex={true} />

interface Props {
  pageContext: {
    posts: Pick<Post, 'frontmatter' | 'fields'>[]
  }
}
const Archive = ({ pageContext: { posts } }: Props) => (
  <Layout>
    <Timeline posts={posts} />
  </Layout>
)

export default Archive
