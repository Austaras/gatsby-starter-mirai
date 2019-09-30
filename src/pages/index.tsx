import React from 'react'
import GatsbyLink from 'gatsby-link'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import { Link } from '../components/Link'

import '../styles/styles.scss'
import style from '../styles/index.module.scss'

export default function Index(props) {
  const { edges: posts, tags } = props.data.allMarkdownRemark
  return (
    <Layout {...props}>
      <div className='blog-posts'>
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => (
            <div className='blog-post-preview' key={post.id}>
              <h1 className='title'>
                <GatsbyLink to={post.frontmatter.path}>{post.frontmatter.title}</GatsbyLink>
              </h1>
              <h2 className='date'>{post.frontmatter.date}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }}></div>
              <nav className={style.linkContainer}>
                <Link to={post.frontmatter.path} className={style.readMore}>
                  Read more »
                </Link>
              </nav>
            </div>
          ))}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(format: HTML)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
      tags: group(field: frontmatter___tags) {
        tag: fieldValue
      }
    }
  }
`
