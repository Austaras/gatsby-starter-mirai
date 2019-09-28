import React from 'react'
import Helmet from 'react-helmet'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { graphql } from 'gatsby'

import Link from '../components/Link'
import Tags from '../components/Tags'
import Layout from '../components/Layout'

import style from '../styles/blog-post.module.scss'

export default function Template(props) {
  const { data, pageContext } = props
  const { markdownRemark: post } = data
  const { next, prev } = pageContext
  return (
    <Layout {...props}>
      <div className='blog-post-container'>
        <Helmet title={post.frontmatter.title} />
        <article>
          <h1 className={style.title}>{post.frontmatter.title}</h1>
          <h2 className={style.date}>{post.frontmatter.date}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Tags list={post.frontmatter.tags || []} />
          <div className={style.navigation}>
            {prev && (
              <Link to={prev.frontmatter.path}>
                <FaChevronLeft /> {prev.frontmatter.title}
              </Link>
            )}
            <div className={style.spacer}></div>
            {next && (
              <Link to={next.frontmatter.path}>
                {next.frontmatter.title} <FaChevronRight />
              </Link>
            )}
          </div>
        </article>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
      }
    }
  }
`
