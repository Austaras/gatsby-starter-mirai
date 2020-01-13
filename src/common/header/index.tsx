import React, { ReactElement } from 'react'
import { FaRegCalendarAlt, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa'
import { format } from 'date-fns/esm'

import style from './header.module.scss'

import { config, PostMeta } from '@/config'
import i18n from '@/i18n'
import { Link } from '..'

interface Props {
  time: Date
  mtime: Date
  timeToRead: number
  title: string
  link?: string
}

export const Header = ({ link, mtime, time, timeToRead, title }: Props) => {
  const metaMap: Record<PostMeta, ReactElement> = {
    create: (
      <span className={style.stat}>
        <FaRegCalendarAlt />
        {` ${i18n.header.createOn} `}
        <time dateTime={format(time, config.style.date)} itemProp='dateCreated datePublished'>
          {format(time, config.style.date)}
        </time>
      </span>
    ),
    update: (
      <span className={style.stat}>
        <FaRegCalendarCheck />
        {` ${i18n.header.updateOn} `}
        <time dateTime={format(mtime, config.style.date)} itemProp='dateModified'>
          {format(mtime, config.style.date)}
        </time>
      </span>
    ),
    wordcount: (
      <span className={style.stat}>
        <FaRegClock />
        {' ' + i18n.header.timeToRead.replace('%s', timeToRead.toString())}
      </span>
    )
  }
  const split = <span className={style.line}></span>
  /* eslint-disable @typescript-eslint/camelcase */
  const { post_meta } = config.style
  const metaArr: ReactElement[] = []
  const last = 2 * post_meta.length - 1
  for (const meta of post_meta) {
    metaArr.push(metaMap[meta])
    if (metaArr.length < last) {
      metaArr.push(split)
    }
  }

  return (
    <header className={style.header}>
      {link ? (
        <h1 className='title' itemProp='name headline'>
          <Link to={link} itemProp='url'>
            {title}
          </Link>
        </h1>
      ) : (
        <h1 className='title' itemProp='name headline'>
          {title}
        </h1>
      )}
      {metaArr}
    </header>
  )
}
