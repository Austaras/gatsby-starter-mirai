import React, { Component, createRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import style from './post.module.scss'

import { Header, Layout, Link, TagList, TOC } from '@/common'
import { isMobile } from '@/utils'

interface Props {
  pageContext: {
    post: Post
    next: Record<'path' | 'title', string>
    prev: Record<'path' | 'title', string>
  }
}
export default class Template extends Component<Props> {
  private article = createRef<HTMLDivElement>()
  private toc?: TOCTree[]
  constructor(props: Props) {
    super(props)
    const toc = this.props.pageContext.post.headings
    if (!isMobile && toc) this.toc = toc
  }
  public shouldComponentUpdate(next: Props) {
    return next.pageContext !== this.props.pageContext
  }
  public render() {
    const { post, next, prev } = this.props.pageContext
    return (
      <TOC.Provider value={this.toc}>
        <Layout>
          <Helmet>
            <title>{post.frontmatter.title}</title>
          </Helmet>
          <Header
            time={new Date(post.frontmatter.date)}
            timeToRead={post.timeToRead}
            title={post.frontmatter.title}
          />

          <article
            className='article'
            id='article'
            dangerouslySetInnerHTML={{ __html: post.html }}
            ref={this.article}
          />

          <TagList list={post.frontmatter.tags ?? []} />

          <nav className={style.navigation}>
            {prev && (
              <Link to={prev.path}>
                <FaChevronLeft /> {prev.title}
              </Link>
            )}
            <div className={style.spacer}></div>
            {next && (
              <Link to={next.path}>
                {next.title} <FaChevronRight />
              </Link>
            )}
          </nav>
        </Layout>
      </TOC.Provider>
    )
  }
}
