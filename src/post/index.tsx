import React, { Component, createRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { calcActive, scrollEvent } from './helper'
import style from './post.module.scss'

import { Header, Layout, Link, TagList, toc$ } from '@/common'
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
  private unsub?: () => void
  constructor(props: Props) {
    super(props)
    const toc = this.props.pageContext.post.headings
    if (isMobile) return
    if (toc) {
      this.toc = toc
      toc$.next({ toc, active: -1 })
    } else {
      toc$.next(undefined)
    }
  }
  public componentDidMount() {
    if (isMobile || !this.toc) return
    const node = this.article.current!
    const titles = [...node.querySelectorAll('h1, h2, h3, h4, h5, h6')] as HTMLHeadingElement[]
    const thr = titles.map(t => t.offsetTop - node.offsetTop)
    requestAnimationFrame(() => {
      const active = calcActive(node, thr)
      toc$.updateActive(active)
      this.unsub = scrollEvent(() => calcActive(node, thr))(active => toc$.updateActive(active))
    })
  }
  public componentWillUnmount() {
    if (!this.unsub) return
    this.unsub()
    if (toc$.state?.toc === this.toc) toc$.next(undefined)
  }
  public shouldComponentUpdate(next: Props) {
    return next.pageContext !== this.props.pageContext
  }
  public render() {
    const { post, next, prev } = this.props.pageContext
    return (
      <Layout>
        <Helmet>
          <title>{post.frontmatter.title}</title>
        </Helmet>
        <Header
          time={new Date(post.frontmatter.date)}
          timeToRead={post.timeToRead}
          title={post.frontmatter.title}
        />

        <article className='article' dangerouslySetInnerHTML={{ __html: post.html }} ref={this.article} />

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
    )
  }
}
