import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { FaTags, FaHome } from 'react-icons/fa'

import style from '../styles/sidebar.module.scss'
import { Img } from './Img'
import { Link } from './Link'
import { config } from '../config'

export function Siderbar(props) {
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
    <aside className={style.sidebar}>
      <nav className={style.staticSide}>
        <Link className={style.title} to='/'>
          {config.site.title}
        </Link>
        <nav className={style.pages}>
          <ul>
            <li>
              <Link className={style.menuLink} to='/' activeClassName={style.active}>
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link className={style.menuLink} to='/tag' activeClassName={style.active}>
                <FaTags /> Tag
              </Link>
            </li>
          </ul>
        </nav>
      </nav>
      <div className={style.stickySide}>
        {config.site.avatar ? (
          <Img
            filename={config.site.avatar}
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
          <Link to='/archives'>
            <span className={style.count}>{totalCount}</span>
            <span className={style.name}>posts</span>
          </Link>
          <Link to='/tag'>
            <span className={style.count}>{tags.length}</span>
            <span className={style.name}>tags</span>
          </Link>
        </nav>
      </div>
    </aside>
  )
}
