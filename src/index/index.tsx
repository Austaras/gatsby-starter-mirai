import React, { useEffect } from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import { Header, Layout, Link, TagList } from '../common'

import '../styles.scss'
import style from './index.module.scss'
import { config } from '../config'
import { Pagination } from './pagination'

interface Props {
  pageContext: {
    posts: Post[]
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
        <section className={style.post} key={post.id}>
          <Header
            link={post.path}
            time={new Date(post.frontmatter.date)}
            title={post.frontmatter.title}
          />
          <article className='article' dangerouslySetInnerHTML={{ __html: post.excerpt }}></article>
          <footer className={style.linkContainer}>
            <Link to={post.path} className={style.readMore}>
              Read more »
            </Link>
            <TagList list={post.frontmatter.tags} />
          </footer>
        </section>
      ))}
      <Pagination {...page}/>
    </Layout>
  )
}
