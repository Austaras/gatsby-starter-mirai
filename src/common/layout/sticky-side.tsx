import React, { useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { graphql, useStaticQuery } from 'gatsby'

import { findElement, TOCComp } from './toc'
import style from './sticky-side.module.scss'

import { Link, Img, useSub, showButton$, toc$ } from '..'
import { config } from '@/config'
import i18n from '@/i18n'

export const StickySide = () => {
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
  const { toc, active } = useSub(toc$) ?? {}
  const showButton = useSub(showButton$)
  const [showToc, setShow] = useState(!!toc)

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
  if (!toc) {
    return (
      <div className={style.stickySide}>
        {site}
        {up}
      </div>
    )
  }
  const activeToc = findElement(toc, active!)
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
      {showToc ? <TOCComp active={activeToc} content={toc} /> : site}
      {up}
    </div>
  )
}
