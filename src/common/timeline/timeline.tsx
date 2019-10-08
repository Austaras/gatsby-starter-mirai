import React, { ReactElement } from 'react'
import { format } from 'date-fns/esm'

import { config } from '../../config'
import style from './timeline.module.scss'

import { Link } from '..'

interface Props {
  posts: Pick<Post, 'path' | 'frontmatter'>[]
  title?: string
}

export function Timeline({ posts: post, title }: Props) {
  const showYear = post.length <= 5
  let year = 0
  const fmt = showYear ? config.style.date : config.style.month_date
  const children: ReactElement[] = []
  if (title) {
    children.push(
      <li className={`${style.item} ${style.title}`} key='title'>
        <h1>{title}</h1>
      </li>
    )
  }

  post.forEach(post => {
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
      <li className={`${style.item} ${style.post}`} key={post.path}>
        <Link className={style.link} to={post.path}>
          <time className={style.time}>{format(time, fmt)}</time>
          <h2 className={`${style.postTitle} title`}>{post.frontmatter.title}</h2>
        </Link>
      </li>
    )
  })

  return <ol className={style.timeline}>{children}</ol>
}
