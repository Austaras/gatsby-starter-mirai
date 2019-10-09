import React, { ReactNode } from 'react'
import { FaPlusCircle } from 'react-icons/fa'

import { Sidebar } from '../sidebar/sidebar'
import style from './layout.module.scss'

import { config } from '@/config'

interface Props {
  className?: string
  children: ReactNode
}

export const Layout = ({ children, className = '' }: Props) => (
  <div className={`${style.layout} ${className}`}>
    <header className={style.header}></header>
    <div className={style.container}>
      <main className={style.main}>{children}</main>
      <Sidebar className={style.sidebar} />
    </div>
    <footer className={style.footer}>
      ©{config.site.from === 0 ? '' : ` ${config.site.from} - `}
      {new Date().getFullYear() + ' '}
      <FaPlusCircle />
      {' ' + config.site.author}
    </footer>
  </div>
)
