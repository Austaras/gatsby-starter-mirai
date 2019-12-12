import React, { forwardRef, useState } from 'react'
import { FaBars } from 'react-icons/fa'

import { menus } from './menus'
import style from './static-side.module.scss'

import { Link } from '..'
import { config } from '@/config'

interface Props {
  isHeader?: boolean
}

export const StaticSide = forwardRef(({ isHeader = false }: Props, ref: React.Ref<HTMLDivElement>) => {
  const [expand, setExpand] = useState(!isHeader)
  return (
    <nav className={`${style.staticSide} ${isHeader ? style.header : ''}`} ref={ref}>
      <Link className={style.title} to='/'>
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
    </nav>
  )
})
