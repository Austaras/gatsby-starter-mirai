import React, { useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { graphql } from 'gatsby'

import { Header } from '../components/Header'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { Tags } from '../components/Tags'

import style from '../styles/blog-post.module.scss'

export default function Template(props) {
  const { data, pageContext } = props
  const { markdownRemark: post } = data
  const { next, prev } = pageContext
  useEffect(() => {
    document.title = post.frontmatter.title
  }, [])
  return (
    <Layout {...props}>
      <article className={style.article}>
        <Header time={new Date(post.frontmatter.date)} title={post.frontmatter.title} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className='spacer'></div>

        <Tags list={post.frontmatter.tags || []} />

        <nav className={style.navigation}>
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
        </nav>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        path
        tags
        title
      }
    }
  }
`
