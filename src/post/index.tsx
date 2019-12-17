import React, { Component } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import style from './post.module.scss'

import { Header, Layout, Link, TagList, SEO, TOC } from '@/common'
import { config } from '@/config'
import { isMobile } from '@/utils'

interface Props {
  pageContext: {
    post: Post
    next: Record<'path' | 'title', string>
    prev: Record<'path' | 'title', string>
  }
}
export default class Template extends Component<Props> {
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
          <SEO
            article={true}
            path={post.path}
            title={post.frontmatter.title}
            description={post.excerpt}
            keywords={post.frontmatter.tags}
          />

          <article className={style.article} itemScope itemType='http://schema.org/Article'>
            <Header
              time={new Date(post.frontmatter.date)}
              timeToRead={post.timeToRead}
              title={post.frontmatter.title}
            />
            <link itemProp='mainEntityOfPage' href={config.site.url + post.path}></link>
            <a hidden href='/about' rel='author'>
              {config.site.author}
            </a>
            <div className='content' id='content' dangerouslySetInnerHTML={{ __html: post.html }} />

            <TagList list={post.frontmatter.tags ?? []} />

            <nav className={style.navigation}>
              {prev && (
                <Link to={prev.path} rel='prev'>
                  <FaChevronLeft /> {prev.title}
                </Link>
              )}
              <div className={style.spacer}></div>
              {next && (
                <Link to={next.path} rel='next'>
                  {next.title} <FaChevronRight />
                </Link>
              )}
            </nav>
          </article>
        </Layout>
      </TOC.Provider>
    )
  }
}
