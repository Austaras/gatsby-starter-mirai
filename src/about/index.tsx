import * as style from './about.module.scss'

import { Layout, SEO } from '@/common'
import { CONFIG } from '@/config'
import i18n from '@/i18n'

interface Props {
  pageContext: {
    content: string
  }
}
const Tag = ({ pageContext: { content } }: Props) => (
  <Layout>
    <SEO title={`About: ${CONFIG.site.author}`} path="/about" />
    <header className={style.header}>
      <h1>{i18n.about}</h1>
    </header>
    <article className="content" dangerouslySetInnerHTML={{ __html: content }} />
  </Layout>
)

export default Tag
