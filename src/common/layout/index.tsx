import React, { ReactNode } from 'react'
import { FaPlusCircle } from 'react-icons/fa'

import { Sidebar } from './sidebar'
import { StaticSide } from './static-side'
import style from './layout.module.scss'

import { config } from '@/config'
import { isMobile } from '@/utils'

interface Props {
  children: ReactNode
  className?: string
}

export const Layout = ({ children, className = '' }: Props) => (
  <div className={`${style.layout} ${className}`}>
    <header className={style.header}></header>
    <StaticSide isHeader={true} />
    <div className={style.container}>
      <main className={style.main}>{children}</main>
      {isMobile ? undefined : <Sidebar />}
    </div>
    <footer className={style.footer}>
      ©{config.site.from === 0 ? '' : ` ${config.site.from} - `}
      <span itemProp='copyrightYear'>{new Date().getFullYear()}</span>
      <FaPlusCircle />
      <span itemProp='copyrightHolder'>{config.site.author}</span>
    </footer>
  </div>
)
