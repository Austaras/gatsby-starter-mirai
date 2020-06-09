import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'

import { config } from '@/config'

import { menus } from './menus'
import style from './static-side.module.scss'

import { Link } from '..'

interface Props {
  isHeader?: boolean
}
export const StaticSide = ({ isHeader = false }: Props) => {
  const [expand, setExpand] = useState(!isHeader)
  return (
    <header
      className={`${style.staticSide} ${isHeader ? style.header : ''}`}
      id={isHeader ? 'header' : 'static'}
      itemScope
      itemType='http://schema.org/WPHeader'>
      <Link className={style.title} to='/' rel='start'>
        {config.site.name}
      </Link>
      {isHeader ? (
        <button className={style.headerButton} onClick={() => setExpand(!expand)}>
          <FaBars />
        </button>
      ) : null}
      <nav className={style.menu} style={{ display: expand ? 'block' : 'none' }}>
        {config.style.menu.map(key => menus[key])}
      </nav>
    </header>
  )
}
