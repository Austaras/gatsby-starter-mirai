import React from 'react'
import { format } from 'date-fns/esm'

import { config } from '../../config'
import style from './timeline.module.scss'

import { Link } from '..'

interface Props {
  posts: any[]
  title?: string
}

export function Timeline({ posts: post, title }: Props) {
  const showYear = post.length <= 5
  let year = 0
  const fmt = showYear ? config.style.date : config.style.month_date

  return (
    <ol className={style.timeline}>
      {title ? (
        <li className={`${style.item} ${style.title}`}>
          <h1>{title}</h1>
        </li>
      ) : (
        undefined
      )}
      {post.map(post => {
        const time = new Date(post.frontmatter.date)
        const item = (
          <li className={`${style.item} ${style.post}`} key={post.id}>
            <Link className={style.link} to={post.frontmatter.path}>
              <time className={style.time}>{format(time, fmt)}</time>
              <h2 className={style.postTitle}>{post.frontmatter.title}</h2>
            </Link>
          </li>
        )
        if (time.getFullYear() !== year && !showYear) {
          year = time.getFullYear()
          return (
            <React.Fragment key={year}>
              <li className={`${style.item} ${style.year}`}>
                <h1>{year}</h1>
              </li>
              {item}
            </React.Fragment>
          )
        }
        return item
      })}
    </ol>
  )
}
