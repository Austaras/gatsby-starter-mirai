import React from 'react'
import { FaRegCalendar } from 'react-icons/fa'
import { format } from 'date-fns/esm'

import style from './header.module.scss'

import { config } from '@/config'
import i18n from '@/i18n'
import { Link } from '..'

interface Props {
  time: Date
  title: string
  link?: string
}

export const Header = ({ link, time, title }: Props) => (
  <header className={style.header}>
    <h1 className={`${style.title} title`}>{link ? <Link to={link}>{title}</Link> : title}</h1>
    <span className={style.stat}>
      <FaRegCalendar />
      {` ${i18n.header.poston} `}
      <time>{format(time, config.style.time)}</time>
    </span>
  </header>
)
