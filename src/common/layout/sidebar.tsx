import React, { memo, useState } from 'react'

import { StaticSide } from './static-side'
import { StickySide } from './sticky-side'
import style from './sidebar.module.scss'

import { useIntersection } from '..'

export const Sidebar = memo(() => {
  const [showButton, setShow] = useState(false)
  const ref = useIntersection<HTMLDivElement>(entr => setShow(!entr[0].isIntersecting))

  return (
    <aside className={style.sidebar}>
      <StaticSide ref={ref} />
      <StickySide showButton={showButton} />
    </aside>
  )
})
