import React, { createContext, useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import style from './post.module.scss'

import { Header, Layout, Link, TagList } from '@/common'

const calcActive = (curr: number, thr: number[]) => {
  if (curr < thr[0]) return -1
  for (let i = 0; i < thr.length - 1; i++) {
    if (thr[i] <= curr && curr < thr[i + 1]) {
      return i
    }
  }
  return thr.length - 1
}
interface TOCData {
  content: string
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
  const [toc, setToc] = useState<TOCData>({
    content: post.tableOfContents,
    active: -1
  })
  const article = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!article.current) return
    const node = article.current
    const thr = ([...node.querySelectorAll('h1, h2, h3, h4, h5, h6')] as HTMLHeadingElement[]).map(
      t => t.offsetTop - node.offsetTop - 180
    )
    const cb = () => setToc({...toc, active: calcActive(-node.getBoundingClientRect().top, thr)})
    document.addEventListener('scroll', cb, { passive: true })
    return () => document.removeEventListener('scroll', cb)
  }, [article.current])

  useEffect(() => {
    document.title = post.frontmatter.title
  }, [])
  return (
    <TOC.Provider value={toc}>
      <Layout>
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
