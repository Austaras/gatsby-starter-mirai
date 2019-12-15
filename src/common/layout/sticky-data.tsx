import React from 'react'
import { graphql, StaticQuery } from 'gatsby'

import style from './sticky-side.module.scss'

import { Img, Link } from '..'

import { config } from '@/config'
import i18n from '@/i18n'

export const site = (
  <StaticQuery
    query={graphql`
      query SidebarQuery {
        allMarkdownRemark(filter: { fileAbsolutePath: { glob: "**/blog/posts/**/*.md" } }) {
          totalCount
          tags: group(field: frontmatter___tags) {
            tag: fieldValue
          }
        }
      }
    `}
    render={({ allMarkdownRemark: { totalCount, tags } }) => [
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
    ]}
  />
)
