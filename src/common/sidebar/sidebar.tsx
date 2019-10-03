import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FaArchive, FaHome, FaTags, FaUserAlt } from 'react-icons/fa'

import style from './sidebar.module.scss'
import { config } from '../../config'

import { Link } from '../link/link'
import { Img } from '../img'

const menus = {
  home: (
    <Link key='home' className={style.menuLink} to='/' activeClassName={style.active}>
      <FaHome /> Home
    </Link>
  ),
  tag: (
    <Link key='tag' className={style.menuLink} to='/tag' activeClassName={style.active}>
      <FaTags /> Tag
    </Link>
  ),
  archive: (
    <Link key='archive' className={style.menuLink} to='/archive' activeClassName={style.active}>
      <FaArchive /> Archive
    </Link>
  ),
  about: (
    <Link key='about' className={style.menuLink} to='/about' activeClassName={style.active}>
      <FaUserAlt /> About me
    </Link>
  )
}

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
  return (
    <aside className={`${style.sidebar} ${className}`}>
      <nav className={style.staticSide}>
        <Link className={style.title} to='/'>
          {config.site.title}
        </Link>
        <nav className={style.menu}>
          <ul>{config.style.menu.map(key => menus[key])}</ul>
        </nav>
      </nav>
      <div className={style.stickySide}>
        {config.style.avatar ? (
          <Img
            filename={config.style.avatar}
            alt='Avatar'
            className={style.avatar}
            imgStyle={{
              width: '128px',
              height: '128px',
              padding: '2px'
            }}
          />
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
        </nav>
      </div>
    </aside>
  )
}
