import React from 'react'
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import { format } from 'date-fns/esm'

import style from './header.module.scss'

import { config } from '@/config'
import i18n from '@/i18n'
import { Link } from '..'

interface Props {
  time: Date
  timeToRead: number
  title: string
  link?: string
}

export const Header = ({ link, time, timeToRead, title }: Props) => (
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
    <span className={style.stat}>
      <FaRegCalendarAlt />
      {` ${i18n.header.postOn} `}
      <time dateTime={format(time, config.style.date)} itemProp='dateCreated' property="article:author">
        {format(time, config.style.date)}
      </time>
    </span>
    <span className={style.line}></span>
    <span className={style.stat}>
      <FaRegClock />
      {' ' + i18n.header.timeToRead.replace('%s', timeToRead.toString())}
    </span>
  </header>
)
