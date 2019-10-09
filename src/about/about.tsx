import React, { useEffect } from 'react'

import style from './about.module.scss'

import { Layout } from '@/common'
import { config } from '@/config'
import i18n from '@/i18n'

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
        <h1>{i18n.about}</h1>
      </header>
      <article className='article' dangerouslySetInnerHTML={{ __html: content.html }} />
    </Layout>
  )
}
