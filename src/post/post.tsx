import React, { useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { graphql } from 'gatsby'

import { End, Header, Layout, Link, TagList } from '../common'

import style from './post.module.scss'

export default function Template(props) {
  const { data, pageContext } = props
  const { markdownRemark: post } = data
  const { next, prev } = pageContext

  useEffect(() => {
    document.title = post.frontmatter.title
  }, [])
  return (
    <Layout {...props}>
      <>
        <Header time={new Date(post.frontmatter.date)} title={post.frontmatter.title} />
        <article className={style.article} dangerouslySetInnerHTML={{ __html: post.html }} />

        <TagList list={post.frontmatter.tags || []} />

        <nav className={style.navigation}>
          {prev && (
            <Link className={style.prev} to={prev.frontmatter.path}>
              <FaChevronLeft /> {prev.frontmatter.title}
            </Link>
          )}
          <div className={style.spacer}></div>
          {next && (
            <Link className={style.next} to={next.frontmatter.path}>
              {next.frontmatter.title} <FaChevronRight />
            </Link>
          )}
        </nav>
      </>
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