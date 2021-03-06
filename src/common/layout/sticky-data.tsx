import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import { config } from '@/config'
import i18n from '@/i18n'

import * as style from './sticky-side.module.scss'

import { Avatar, Link } from '..'

export const Site = () => {
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
  return (
    <>
      {config.site.avatar ? (
        <Link to='/about' className={style.container} key='about'>
          <Avatar />
        </Link>
      ) : null}
      <p className={style.authorName} key='name' itemProp='name'>
        {config.site.author}
      </p>
      <div className={style.description} itemProp='description' key='des'>
        {config.site.description}
      </div>
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
          <Link to='/tags'>
            <span className={style.count}>{tags.length}</span>
            <br />
            <span className={style.name}>{i18n.sidebar.tags}</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
