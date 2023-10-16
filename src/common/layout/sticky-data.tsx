import { graphql, useStaticQuery } from 'gatsby'

import * as style from './sticky-side.module.scss'

import { Avatar, Link } from '..'

import { ExternalLinkComp } from './external-links'

import { CONFIG } from '@/config'
import i18n from '@/i18n'

export const Site = () => {
  const { totalCount, tags } = useStaticQuery(graphql`
    query SidebarQuery {
      allMarkdownRemark(filter: { fileAbsolutePath: { glob: "**/blog/posts/**/*.md" } }) {
        totalCount
        tags: group(field: { frontmatter: { tags: SELECT } }) {
          tag: fieldValue
        }
      }
    }
  `).allMarkdownRemark
  return (
    <>
      {CONFIG.site.avatar ? (
        <Link to="/about" className={style.container} key="about">
          <Avatar />
        </Link>
      ) : null}
      <p className={style.authorName} key="name" itemProp="name">
        {CONFIG.site.author}
      </p>
      <div className={style.description} itemProp="description" key="des">
        {CONFIG.site.description}
      </div>
      <nav className={style.stat} key="nav">
        <div className={style.posts}>
          <Link to="/archive">
            <span className={style.count}>{totalCount}</span>
            <br />
            <span className={style.name}>{i18n.sidebar.post}</span>
          </Link>
        </div>
        <div className={style.line} key="line"></div>
        <div className={style.tags} key="tags">
          <Link to="/tags">
            <span className={style.count}>{tags.length}</span>
            <br />
            <span className={style.name}>{i18n.sidebar.tags}</span>
          </Link>
        </div>
      </nav>
      {CONFIG.site.external_link ? <ExternalLinkComp link={CONFIG.site.external_link} /> : null}
    </>
  )
}
