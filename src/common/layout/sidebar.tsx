import React, { useEffect, useRef, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { graphql, useStaticQuery } from 'gatsby'

import style from './sidebar.module.scss'

import { StaticSide } from './static-side'

import { Link, Img } from '..'
import { config } from '@/config'
import i18n from '@/i18n'

export function Sidebar({ className = '' }) {
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
  const [showButton, setShow] = useState(false)
  const node = useRef<HTMLDivElement>(null)
  const intr = useRef<IntersectionObserver>()
  useEffect(() => {
    if (!node.current) return
    if (!intr.current) {
      intr.current = new IntersectionObserver(entr => {
        setShow(!entr[0].isIntersecting)
      })
    }
    intr.current.observe(node.current)
    return () => intr.current && intr.current.disconnect()
  }, [node.current])

  return (
    <aside className={`${style.sidebar} ${className}`}>
      <StaticSide ref={node} />
      <div className={style.stickySide}>
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
        <div
          className={`${style.back} ${showButton ? style.show : style.hide}`}
          onClick={() => showButton && window.scrollTo({ top: 0 })}
        >
          <FaArrowUp />
        </div>
      </div>
    </aside>
  )
}
