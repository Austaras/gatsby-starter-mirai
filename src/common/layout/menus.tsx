import React, { ReactElement } from 'react'
import { FaArchive, FaHome, FaTags, FaUserAlt } from 'react-icons/fa'

import i18n from '@/i18n'

import style from './menus.module.scss'

import { Link } from '..'

const data = {
  home: <FaHome />,
  tags: <FaTags />,
  archive: <FaArchive />,
  about: <FaUserAlt />
} as const
type Tag = keyof typeof data
export const menus: Record<string, ReactElement> = (Object.keys(data) as Tag[]).reduce((o, key) => {
  o[key] = (
    <Link
      key={key}
      className={style.menuLink}
      to={`/${key === 'home' ? '' : key}`}
      activeClassName={style.active}
      rel='section'>
      {data[key]} {i18n.menu[key]}
    </Link>
  )
  return o
}, {} as Record<Tag, React.ReactElement>)
