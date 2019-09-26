import React from 'react'
import Helmet from 'react-helmet'
import { FaBackward, FaForward } from 'react-icons/fa'
import { graphql } from 'gatsby'

import Link from '../components/Link'
import Tags from '../components/Tags'
import Layout from '../components/Layout'

import '../styles/blog-post.scss'

export default function Template(props) {
  const { data, pageContext } = props
  const { markdownRemark: post } = data
  const { next, prev } = pageContext
  return (
    <Layout {...props}>
      <div className='blog-post-container'>
        <Helmet title={post.frontmatter.title} />
        <article className='blog-post'>
          <h1 className='title'>{post.frontmatter.title}</h1>
          <h2 className='date'>{post.frontmatter.date}</h2>
          <div className='blog-post-content' dangerouslySetInnerHTML={{ __html: post.html }} />
          <Tags list={post.frontmatter.tags || []} />
          <div className='navigation'>
            {prev && (
              <Link className='prev' to={prev.frontmatter.path}>
                <FaBackward /> {prev.frontmatter.title}
              </Link>
            )}
            {next && (
              <Link className='next' to={next.frontmatter.path}>
                {next.frontmatter.title} <FaForward />
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
