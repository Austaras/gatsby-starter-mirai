import React, { ReactNode } from 'react'
import { FaPlusCircle } from 'react-icons/fa'

import { Sidebar } from './sidebar'
import { StaticSide } from './static-side'
import style from './layout.module.scss'

import { config } from '@/config'

const isMobile =
  typeof matchMedia === 'undefined' ? false : matchMedia('screen and (max-width: 600px)').matches

interface Props {
  className?: string
  children: ReactNode
}

export const Layout = ({ children, className = '' }: Props) => (
  <div className={`${style.layout} ${className}`}>
    <header className={style.header}></header>
    <StaticSide isHeader={true} />
    <div className={style.container}>
      <main className={style.main}>{children}</main>
      {isMobile ? undefined : <Sidebar className={style.sidebar} />}
    </div>
    <footer className={style.footer}>
      ©{config.site.from === 0 ? '' : ` ${config.site.from} - `}
      {new Date().getFullYear()}
      <FaPlusCircle />
      {config.site.author}
    </footer>
  </div>
)
