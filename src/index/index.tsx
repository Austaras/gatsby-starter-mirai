import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
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
    posts: Pick<Post, 'excerpt' | 'frontmatter' | 'path' | 'timeToRead'>[]
    page: PageConf
  }
}

const Index = ({ pageContext: { posts, page } }: Props) => (
  <Layout>
    <Helmet>
      <title>{config.site.name}</title>
    </Helmet>
    {posts.map(post => (
      <section className={style.post} key={post.path}>
        <Header
          link={post.path}
          time={new Date(post.frontmatter.date)}
          timeToRead={post.timeToRead}
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

export default Index
