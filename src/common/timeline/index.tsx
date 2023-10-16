import { ReactElement } from 'react'
import { format } from 'date-fns/esm'


import * as style from './timeline.module.scss'

import { Link } from '..'

import { CONFIG } from '@/config'

interface Props {
  posts: Pick<Post, 'fields' | 'frontmatter'>[]
  title?: string
}

export function Timeline({ posts, title }: Props) {
  const showYear = posts.length <= 5
  let year = 0
  const fmt = showYear ? CONFIG.style.date : CONFIG.style.month_date
  const children: ReactElement[] = []
  if (title) {
    children.push(
      <li className={`${style.item} ${style.title}`} key="title">
        <h1>{title}</h1>
      </li>
    )
  }

  posts.forEach(post => {
    const time = new Date(post.frontmatter.date)
    if (time.getFullYear() !== year && !showYear) {
      year = time.getFullYear()
      children.push(
        <li className={`${style.item} ${style.year}`} key={year}>
          <h1>{year}</h1>
        </li>
      )
    }
    children.push(
      <li className={`${style.item} ${style.post}`} key={post.fields.path}>
        <Link className={style.link} to={post.fields.path}>
          <time className={style.time}>{format(time, fmt)}</time>
          <h2 className={`${style.postTitle} title`}>{post.frontmatter.title}</h2>
        </Link>
      </li>
    )
  })

  return <ol className={style.timeline}>{children}</ol>
}
