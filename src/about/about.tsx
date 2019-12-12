import React from 'react'
import { Helmet } from 'react-helmet-async'

import style from './about.module.scss'

import { Layout } from '@/common'
import { config } from '@/config'
import i18n from '@/i18n'

interface Props {
  pageContext: {
    content: string
  }
}
const Tag = ({ pageContext: { content } }: Props) => (
  <Layout>
    <Helmet>
      <title>About: {config.site.author}</title>
    </Helmet>
    <header className={style.header}>
      <h1>{i18n.about}</h1>
    </header>
    <article className='article' dangerouslySetInnerHTML={{ __html: content }} />
  </Layout>
)

export default Tag
