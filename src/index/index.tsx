import React, { useEffect } from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import style from './index.module.scss'
import { Pagination } from './pagination'

import { Header, Layout, Link, TagList } from '@/common'
import { config } from '@/config'
import i18n from '@/i18n'
import '@/styles.scss'

interface Props {
  pageContext: {
    posts: Pick<Post, 'excerpt' | 'frontmatter' | 'path'>[]
    page: PageConf
  }
}

export default function Index({ pageContext }: Props) {
  const { posts, page } = pageContext

  useEffect(() => {
    document.title = config.site.name
  }, [])
  return (
    <Layout>
      {posts.map(post => (
        <section className={style.post} key={post.path}>
          <Header
            link={post.path}
            time={new Date(post.frontmatter.date)}
            title={post.frontmatter.title}
          />
          <article className='article' dangerouslySetInnerHTML={{ __html: post.excerpt }}></article>
          <footer className={style.linkContainer}>
            <Link to={post.path} className={`${style.readMore} title`}>
              {i18n.readmore} »
            </Link>
            <TagList list={post.frontmatter.tags} />
          </footer>
        </section>
      ))}
      <Pagination {...page} />
    </Layout>
  )
}
