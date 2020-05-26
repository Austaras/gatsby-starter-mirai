import React from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import { Header, Layout, Link, SEO, TagList } from '@/common'

import i18n from '@/i18n'

import style from './index.module.scss'
import { Pagination } from './pagination'

import '@/styles.scss'

interface Props {
  pageContext: {
    posts: Omit<Post, 'html' | 'heading'>[]
    page: PageConf
  }
}

const Index = ({ pageContext: { posts, page } }: Props) => (
  <Layout>
    <SEO />
    {posts.map(post => (
      <section className={style.post} key={post.path}>
        <Header
          link={post.path}
          time={new Date(post.frontmatter.date)}
          mtime={new Date(post.parent.mtimeMs)}
          timeToRead={post.timeToRead}
          title={post.frontmatter.title}
        />
        <article className='content' dangerouslySetInnerHTML={{ __html: post.excerpt }}></article>
        <footer className={style.linkContainer}>
          <Link to={post.path} className={`${style.readMore} title`} rel='contents'>
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
