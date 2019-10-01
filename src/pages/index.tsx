import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

import { Header } from '../components/Header'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'

import '../styles/styles.scss'
import style from '../styles/index.module.scss'
import { config } from '../config'

export default function Index(props) {
  const { posts } = props.data.allMarkdownRemark

  useEffect(() => {
    document.title = config.site.title
  }, [])
  return (
    <Layout {...props}>
      <div className='blog-posts'>
        {posts
          .filter(({ post }) => post.frontmatter.title.length > 0)
          .map(({ post }) => (
            <div className='blog-post-preview' key={post.id}>
              <Header
                link={post.frontmatter.path}
                time={new Date(post.frontmatter.date)}
                title={post.frontmatter.title}
              />
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
              <div className={style.linkContainer}>
                <Link to={post.frontmatter.path} className={style.readMore}>
                  Read more »
                </Link>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      posts: edges {
        post: node {
          excerpt(format: HTML)
          id
          frontmatter {
            title
            date
            path
          }
        }
      }
    }
  }
`
