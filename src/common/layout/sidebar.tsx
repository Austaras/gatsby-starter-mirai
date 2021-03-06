import React from 'react'

import { StaticSide } from './static-side'
import { StickySide } from './sticky-side'
import * as style from './sidebar.module.scss'

export const Sidebar = () => (
  <aside className={style.sidebar}>
    <StaticSide />
    <StickySide />
  </aside>
)
