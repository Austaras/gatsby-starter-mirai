import React from 'react'
import { FaRegCalendarAlt , FaRegClock} from 'react-icons/fa'
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
    <h1 className={`${style.title} title`}>{link ? <Link to={link}>{title}</Link> : title}</h1>
    <span className={style.stat}>
      <FaRegCalendarAlt />
      {` ${i18n.header.postOn} `}
      <time>{format(time, config.style.date)}</time>
    </span>
    <span className={style.line}></span>
    <span className={style.stat}>
      <FaRegClock />
      {' ' + i18n.header.timeToRead.replace('%s', timeToRead.toString())}
    </span>
  </header>
)
