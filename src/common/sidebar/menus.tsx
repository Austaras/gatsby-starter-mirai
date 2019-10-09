import React, { ReactElement } from 'react'
import { FaArchive, FaHome, FaTags, FaUserAlt } from 'react-icons/fa'

import { Link } from '../link/link'
import style from './menus.module.scss'

import i18n from '@/i18n'

export const menus: Record<string, ReactElement> = {
  home: (
    <Link key='home' className={style.menuLink} to='/' activeClassName={style.active}>
      <FaHome /> {i18n.menu.home}
    </Link>
  ),
  tag: (
    <Link key='tag' className={style.menuLink} to='/tag' activeClassName={style.active}>
      <FaTags /> {i18n.menu.tags}
    </Link>
  ),
  archive: (
    <Link key='archive' className={style.menuLink} to='/archive' activeClassName={style.active}>
      <FaArchive /> {i18n.menu.archive}
    </Link>
  ),
  about: (
    <Link key='about' className={style.menuLink} to='/about' activeClassName={style.active}>
      <FaUserAlt /> {i18n.menu.about}
    </Link>
  )
}
