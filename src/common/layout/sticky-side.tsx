import React, { useContext, useRef, useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { graphql, useStaticQuery } from 'gatsby'

import style from './sticky-side.module.scss'

import { Link, Img } from '..'
import { config } from '@/config'
import { TOC } from '@/post/post'
import i18n from '@/i18n'

interface Props {
  showButton: boolean
}
export function StickySide({ showButton }: Props) {
  const { totalCount, tags } = useStaticQuery(graphql`
    query SidebarQuery {
      allMarkdownRemark {
        totalCount
        tags: group(field: frontmatter___tags) {
          tag: fieldValue
        }
      }
    }
  `).allMarkdownRemark
  const toc = useContext(TOC)
  const [showToc, setShow] = useState(!!toc)
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
  const site = (
    <>
      {config.site.avatar ? (
        <Link to='/about' className={style.container}>
          <Img filename={config.site.avatar} alt='Avatar' />
        </Link>
      ) : null}
      <p className={style.authorName}>{config.site.author}</p>
      <nav className={style.stat}>
        <div className={style.posts}>
          <Link to='/archive'>
            <span className={style.count}>{totalCount}</span>
            <br />
            <span className={style.name}>{i18n.sidebar.post}</span>
          </Link>
        </div>
        <div className={style.line}></div>
        <div className={style.tags}>
          <Link to='/tag'>
            <span className={style.count}>{tags.length}</span>
            <br />
            <span className={style.name}>{i18n.sidebar.tag}</span>
          </Link>
        </div>
      </nav>
    </>
  )
  const up = (
    <div
      className={`${style.back} ${showButton ? style.show : style.hide}`}
      onClick={() => window.scrollTo({ top: 0 })}>
      <FaArrowUp />
    </div>
  )
  if (!toc) {
    return (
      <div className={style.stickySide}>
        {site}
        {up}
      </div>
    )
  }
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
      {showToc ? (
        <div className={style.toc} dangerouslySetInnerHTML={{ __html: toc.content }} ref={tocNode}></div>
      ) : (
        site
      )}
      {up}
    </div>
  )
}
