import React, { ReactElement } from 'react'
import { FaRegCalendarAlt, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa'
import { format } from 'date-fns/esm'

import { config, PostMeta } from '@/config'
import i18n from '@/i18n'

import style from './header.module.scss'

import { Link } from '..'

const Split = () => <span className={style.line}></span>

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
      <span className={style.stat} key='create'>
        <FaRegCalendarAlt />
        {i18n.header.createOn}
        <time dateTime={format(time, config.style.date)} itemProp='dateCreated datePublished'>
          {format(time, config.style.date)}
        </time>
      </span>
    ),
    update: (
      <span className={style.stat} key='update'>
        <FaRegCalendarCheck />
        {i18n.header.updateOn}
        <time dateTime={format(mtime, config.style.date)} itemProp='dateModified'>
          {format(mtime, config.style.date)}
        </time>
      </span>
    ),
    wordcount: (
      <span className={style.stat} key='wordCount'>
        <FaRegClock />
        {i18n.header.timeToRead.replace('%s', timeToRead.toString())}
      </span>
    )
  }

  const { post_meta } = config.style
  const metaArr: ReactElement[] = []
  const last = 2 * post_meta.length - 1
  for (const meta of post_meta) {
    metaArr.push(metaMap[meta])
    if (metaArr.length < last) {
      metaArr.push(<Split key={meta + 'split'} />)
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
