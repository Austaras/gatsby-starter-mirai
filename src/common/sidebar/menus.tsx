import React, { ReactElement } from 'react'
import { FaArchive, FaHome, FaTags, FaUserAlt } from 'react-icons/fa'

import { Link } from '../link/link'
import style from './menus.module.scss'

export const menus: Record<string, ReactElement> = {
  home: (
    <Link key='home' className={style.menuLink} to='/' activeClassName={style.active}>
      <FaHome /> Home
    </Link>
  ),
  tag: (
    <Link key='tag' className={style.menuLink} to='/tag' activeClassName={style.active}>
      <FaTags /> Tag
    </Link>
  ),
  archive: (
    <Link key='archive' className={style.menuLink} to='/archive' activeClassName={style.active}>
      <FaArchive /> Archive
    </Link>
  ),
  about: (
    <Link key='about' className={style.menuLink} to='/about' activeClassName={style.active}>
      <FaUserAlt /> About me
    </Link>
  )
}
