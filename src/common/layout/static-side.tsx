import { useState } from 'react'
import { FaBars } from 'react-icons/fa'

import { menus } from './menus'
import * as style from './static-side.module.scss'

import { Link } from '..'

import { CONFIG } from '@/config'

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
      itemType="http://schema.org/WPHeader"
    >
      <Link className={style.title} to="/" rel="start">
        {CONFIG.site.name}
      </Link>
      {isHeader ? (
        <button className={style.headerButton} onClick={() => setExpand(!expand)} type="button">
          <FaBars />
        </button>
      ) : null}
      <nav className={style.menu} style={{ display: expand ? 'block' : 'none' }}>
        {CONFIG.style.menu.map(key => menus[key])}
      </nav>
    </header>
  )
}
