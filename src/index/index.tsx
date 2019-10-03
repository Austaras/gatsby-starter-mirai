import React, { useEffect } from 'react'

import { End, Header, Layout, Link } from '../common'

import '../common/styles.scss'
import style from './index.module.scss'
import { config } from '../config'

export default function Index(props) {
  const { posts } = props.data.allMarkdownRemark

  useEffect(() => {
    document.title = config.site.title
  }, [])
  return (
    <Layout>
      {posts.map(({ post }, index) => (
        <section className={style.post} key={post.id}>
          <Header
            link={post.frontmatter.path}
            time={new Date(post.frontmatter.date)}
            title={post.frontmatter.title}
          />
          <article dangerouslySetInnerHTML={{ __html: post.excerpt }}></article>
          <footer className={style.linkContainer}>
            <Link to={post.frontmatter.path} className={style.readMore}>
              Read more »
            </Link>
            {index !== posts.length - 1 ? <End /> : undefined}
          </footer>
        </section>
      ))}
    </Layout>
  )
}
