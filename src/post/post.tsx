import React, { useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import style from './post.module.scss'

import { Header, Layout, Link, TagList } from '@/common'

interface Props {
  pageContext: {
    post: Post
    next: Pick<Post, 'path' | 'frontmatter'>
    prev: Pick<Post, 'path' | 'frontmatter'>
  }
}

export default function Template({ pageContext }: Props) {
  const { post, next, prev } = pageContext

  useEffect(() => {
    document.title = post.frontmatter.title
  }, [])
  return (
    <Layout>
      <Header
        time={new Date(post.frontmatter.date)}
        timeToRead={post.timeToRead}
        title={post.frontmatter.title}
      />
      <article className='article' dangerouslySetInnerHTML={{ __html: post.html }} />

      <TagList list={post.frontmatter.tags ?? []} />

      <nav className={style.navigation}>
        {prev && (
          <Link to={prev.path}>
            <FaChevronLeft /> {prev.frontmatter.title}
          </Link>
        )}
        <div className={style.spacer}></div>
        {next && (
          <Link to={next.path}>
            {next.frontmatter.title} <FaChevronRight />
          </Link>
        )}
      </nav>
    </Layout>
  )
}
