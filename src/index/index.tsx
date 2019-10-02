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
    <Layout {...props}>
      <div className={style.posts}>
        {posts
          .filter(({ post }) => post.frontmatter.title.length > 0)
          .map(({ post }) => (
            <div className='blog-post-preview' key={post.id}>
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
                <End />
              </footer>
            </div>
          ))}
      </div>
    </Layout>
  )
}
