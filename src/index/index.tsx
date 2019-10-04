import React, { useEffect } from 'react'

import { Header, Layout, Link, TagList } from '../common'

import '../common/styles.scss'
import style from './index.module.scss'
import { config } from '../config'

export default function Index(props) {
  const { edges } = props.pageContext.allMarkdownRemark

  useEffect(() => {
    document.title = config.site.title
  }, [])
  return (
    <Layout>
      {edges.map(({ node }) => (
        <section className={style.post} key={node.id}>
          <Header
            link={node.frontmatter.path}
            time={new Date(node.frontmatter.date)}
            title={node.frontmatter.title}
          />
          <article dangerouslySetInnerHTML={{ __html: node.excerpt }}></article>
          <footer className={style.linkContainer}>
            <Link to={node.frontmatter.path} className={style.readMore}>
              Read more »
            </Link>
            <TagList list={node.frontmatter.tags} />
          </footer>
        </section>
      ))}
    </Layout>
  )
}
