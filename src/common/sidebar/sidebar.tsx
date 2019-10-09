import React, { useEffect, useRef, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { graphql, useStaticQuery } from 'gatsby'

import style from './sidebar.module.scss'
import { config } from '../../config'

import { Link } from '../link/link'
import { Img } from '../img'
import { menus } from './menus'

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
  const intr = useRef<IntersectionObserver>(
    new IntersectionObserver(entr => {
      setShow(!entr[0].isIntersecting)
    })
  )
  useEffect(() => {
    if (!node.current) {
      return
    }
    intr.current.observe(node.current)
    return () => intr.current.disconnect()
  }, [node.current])

  return (
    <aside className={`${style.sidebar} ${className}`}>
      <nav className={style.staticSide} ref={node}>
        <Link className={style.title} to='/'>
          {config.site.name}
        </Link>
        <nav className={style.menu}>
          <ul>{config.style.menu.map(key => menus[key])}</ul>
        </nav>
      </nav>
      <div className={style.stickySide}>
        {config.site.avatar ? (
          <Link to='/about' className={style.container}>
            <Img filename={config.site.avatar} alt='Avatar' />
          </Link>
        ) : null}
        <p className={style.authorName}>{config.site.author}</p>
        <nav className={style.stat}>
          <Link to='/archive'>
            <span className={style.count}>{totalCount}</span>
            <br />
            <span className={style.name}>posts</span>
          </Link>
          <Link to='/tag'>
            <span className={style.count}>{tags.length}</span>
            <br />
            <span className={style.name}>tags</span>
          </Link>
          <div
            className={`${style.back} ${showButton ? style.show : style.hide}`}
            onClick={() => showButton && window.scrollTo({ top: 0 })}
          >
            <FaArrowUp />
          </div>
        </nav>
      </div>
    </aside>
  )
}
