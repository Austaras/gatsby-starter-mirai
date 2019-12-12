import React, { createContext, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import { calcActive, generateTree, TOCTree } from './helper'
import style from './post.module.scss'

import { Header, Layout, Link, TagList, useConstant } from '@/common'

export interface TOCData {
  content?: TOCTree[]
  active: number
}
interface Props {
  pageContext: {
    post: Post
    next: Pick<Post, 'path' | 'frontmatter'>
    prev: Pick<Post, 'path' | 'frontmatter'>
  }
}

export const TOC = createContext<TOCData | undefined>(undefined)
export default function Template({ pageContext }: Props) {
  const { post, next, prev } = pageContext
  const titles = useConstant(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(post.html, 'text/html')
    const titles = [...doc.querySelectorAll('h1, h2, h3, h4, h5, h6')] as HTMLHeadingElement[]
    return titles
  })
  const [toc, setToc] = useState<TOCData>({
    content: titles.length === 0 ? undefined : generateTree(titles),
    active: -1
  })
  const article = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!article.current) return
    const node = article.current
    const thr = ([...node.querySelectorAll('h1, h2, h3, h4, h5, h6')] as HTMLHeadingElement[]).map(
      t => t.offsetTop - node.offsetTop
    )
    setToc({ content: toc.content, active: calcActive(-node.getBoundingClientRect().top, thr) })
    const cb = () =>
      setToc({ content: toc.content, active: calcActive(-node.getBoundingClientRect().top, thr) })
    document.addEventListener('scroll', cb, { passive: true })
    return () => document.removeEventListener('scroll', cb)
  }, [article.current])

  return (
    <TOC.Provider value={toc}>
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
    </TOC.Provider>
  )
}
