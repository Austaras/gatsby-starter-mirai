import React, { useContext, useRef, useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { graphql, useStaticQuery } from 'gatsby'

import style from './sticky-side.module.scss'

import { Link, Img } from '..'
import { config } from '@/config'
import { TOC, TOCData } from '@/post/post'
import { TOCTree } from '@/post/helper'
import i18n from '@/i18n'

interface TOCProps {
  content: TOCData['content']
  active: Set<TOCTree>
}
const TOCComp = ({ active, content }: TOCProps) =>
  content ? (
    <ul className={style.toc}>
      {content.map(c => (
        <li key={c.hash}>
          <a href={'#' + c.hash} key='link' className={active.has(c) ? style.active : ''}>
            {c.content}
          </a>
          {c.children && active.has(c) && (
            <TOCComp active={active} content={c.children} key='list' />
          )}
        </li>
      ))}
    </ul>
  ) : null

function findElement(tree: TOCTree[], active: number) {
  console.log(active)
  const set = new Set<TOCTree>()
  const visited = new Set<TOCTree>()
  if (active === -1) return set
  const stack: TOCTree[] = []
  let current = tree[0]
  visited.add(current)
  while (visited.size < active + 1) {
    let next = current.children?.find(c => !visited.has(c))
    if (next) {
      visited.add(next)
      stack.push(current)
      current = next
    } else {
      next = stack.pop()
      if (!next) {
        next = tree.find(c => !visited.has(c))!
        visited.add(next)
      }
      current = next
    }
  }
  set.add(current)
  while (stack.length > 0) {
    set.add(stack.pop()!)
  }
  console.log(set)
  return set
}

interface Props {
  showButton: boolean
}
export function StickySide({ showButton }: Props) {
  const { totalCount, tags } = useStaticQuery(graphql`
    query SidebarQuery {
      allMarkdownRemark(filter: { fileAbsolutePath: { glob: "**/blog/posts/**/*.md" } }) {
        totalCount
        tags: group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }
  `).allMarkdownRemark
  const toc = useContext(TOC)
  const [showToc, setShow] = useState(!!toc && !!toc.content)
  const prevActive = useRef(toc ? toc.active : -1)
  const tocNode = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!toc || !tocNode.current) return
    const navs = [...tocNode.current.querySelectorAll('a')]
    if (prevActive.current !== toc.active && prevActive.current !== -1) {
      navs[prevActive.current].classList.remove(style.active)
    }
    if (navs[toc.active]) {
      navs[toc.active].classList.add(style.active)
      prevActive.current = toc.active
    }
  }, [toc, tocNode.current])
  const site = [
    config.site.avatar ? (
      <Link to='/about' className={style.container} key='about'>
        <Img filename={config.site.avatar} alt='Avatar' />
      </Link>
    ) : null,
    <p className={style.authorName} key='name'>
      {config.site.author}
    </p>,
    <nav className={style.stat} key='nav'>
      <div className={style.posts}>
        <Link to='/archive'>
          <span className={style.count}>{totalCount}</span>
          <br />
          <span className={style.name}>{i18n.sidebar.post}</span>
        </Link>
      </div>
      <div className={style.line} key='line'></div>
      <div className={style.tags} key='tags'>
        <Link to='/tag'>
          <span className={style.count}>{tags.length}</span>
          <br />
          <span className={style.name}>{i18n.sidebar.tag}</span>
        </Link>
      </div>
    </nav>
  ]
  const up = (
    <div
      className={`${style.back} ${showButton ? style.show : style.hide}`}
      onClick={() => window.scrollTo({ top: 0 })}
      key='key'>
      <FaArrowUp />
    </div>
  )
  if (!toc || !toc.content) {
    return (
      <div className={style.stickySide}>
        {site}
        {up}
      </div>
    )
  }
  const active = findElement(toc.content, toc.active)
  return (
    <div className={style.stickySide}>
      <ul className={style.tabs}>
        <li className={showToc ? style.active : ''} onClick={() => !showToc && setShow(true)}>
          {i18n.tab.toc}
        </li>
        <li className={showToc ? '' : style.active} onClick={() => showToc && setShow(false)}>
          {i18n.tab.site}
        </li>
      </ul>
      {showToc ? <TOCComp active={active} content={toc.content} /> : site}
      {up}
    </div>
  )
}
