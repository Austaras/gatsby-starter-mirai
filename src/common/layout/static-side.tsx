import React, { useEffect, useRef, useState } from 'react'
import { FaBars } from 'react-icons/fa'

import { menus } from './menus'
import style from './static-side.module.scss'

import { Link, showButton$ } from '..'
import { config } from '@/config'

const useIntersection = <T extends Element = HTMLElement>(isHeader: boolean) => {
  if (isHeader) return
  const node = useRef<T>(null)
  const intr = useRef<IntersectionObserver>()
  useEffect(() => {
    if (!node.current) return
    if (!intr.current) {
      intr.current = new IntersectionObserver(entr => showButton$.next(!entr[0].isIntersecting))
    }
    intr.current.observe(node.current)
    return () => intr.current!.disconnect()
  }, [node.current])
  return node
}

interface Props {
  isHeader?: boolean
}
export const StaticSide = ({ isHeader = false }: Props) => {
  const [expand, setExpand] = useState(!isHeader)
  const ref = useIntersection<HTMLDivElement>(isHeader)
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
}
