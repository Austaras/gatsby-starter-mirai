import React from 'react'
import { FaRegCalendar } from 'react-icons/fa'
import { format } from 'date-fns/esm'

import { config } from '../../config'
import style from './header.module.scss'

import { Link } from '..'

interface Props {
  time: Date
  title: string
  link?: string
}

export const Header = ({ link, time, title }: Props) => (
    <header className={style.header}>
      <h1 className={style.title}>{link ? <Link to={link}>{title}</Link> : title}</h1>
      <span className={style.stat}>
        <FaRegCalendar />
        {' Posted on '}
        <time>{format(time, config.style.time)}</time>
      </span>
    </header>
  )
