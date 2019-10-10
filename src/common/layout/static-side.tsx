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
      <button className={style.headerButton} onClick={() => isHeader && setExpand(!expand)}>
        <FaBars />
      </button>
      <nav className={style.menu} style={{ display: expand ? 'block' : 'none' }}>
        <ul>{config.style.menu.map(key => menus[key])}</ul>
      </nav>
    </nav>
  )
})
