import React, { memo, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { fromEvent } from 'rxjs'
import { auditTime, distinctUntilKeyChanged, map } from 'rxjs/operators'

import { calcActive, generateTree } from './helper'
import style from './post.module.scss'

import { Header, Layout, Link, TagList, toc$, useConstant } from '@/common'
import { isMobile } from '@/utils'

interface Props {
  pageContext: {
    post: Post
    next: Pick<Post, 'path' | 'frontmatter'>
    prev: Pick<Post, 'path' | 'frontmatter'>
  }
}
export default memo(
  function Template({ pageContext }: Props) {
    console.log('start')
    const { post, next, prev } = pageContext
    const article = useRef<HTMLDivElement>(null)
    useConstant(() => toc$.next(post.headings ? { toc: [], active: -1 } : undefined))
    useEffect(() => {
      console.log(333)
      if (isMobile || !post.headings) return
      const node = article.current!
      const titles = [...node.querySelectorAll('h1, h2, h3, h4, h5, h6')] as HTMLHeadingElement[]
      const toc = generateTree(titles)
      const thr = titles.map(t => t.offsetTop - node.offsetTop)
      toc$.next({
        toc,
        active: calcActive(node, thr)
      })
      const scroll$ = fromEvent(document, 'scroll').pipe(
        // 3 frames
        auditTime(64),
        map(() => ({
          toc,
          active: calcActive(node, thr)
        })),
        distinctUntilKeyChanged('active')
      )
      const sub = scroll$.subscribe(ev => {
        console.log(ev)
        toc$.next(ev)
      })
      return () => {
        console.log(123)
        toc$.next(undefined)
        sub.unsubscribe()
      }
    }, [])

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

        <article className='article' dangerouslySetInnerHTML={{ __html: post.html }} ref={article} />

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
  },
  (prev, curr) => {
    console.log(prev.pageContext === curr.pageContext)
    return prev.pageContext === curr.pageContext
  }
)
