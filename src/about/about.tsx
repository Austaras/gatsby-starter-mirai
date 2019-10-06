import React, { useEffect } from 'react'

import { Layout } from '../common'
import { config } from '../config'
import style from './about.module.scss'

interface Props {
  pageContext: {
    content: Post
  }
}

export default function Tag({ pageContext }: Props) {
  const { content } = pageContext
  useEffect(() => {
    document.title = `About: ${config.site.author}`
  }, [])
  return (
    <Layout>
      <header className={style.header}>
        <h1>about</h1>
      </header>
      <article className='article' dangerouslySetInnerHTML={{ __html: content.html }} />
    </Layout>
  )
}
