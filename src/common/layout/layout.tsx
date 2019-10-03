import React from 'react'
import { FaPlusCircle } from 'react-icons/fa'

import { Sidebar } from '../sidebar/sidebar'
import { config } from '../../config'
import style from './layout.module.scss'

interface Props {
  className?: string
  children: React.ReactNode
}

export const Layout = ({ children, className = '' }: Props) => (
  <div className={`${style.layout} ${className}`}>
    <header className={style.header}></header>
    <div className={style.container}>
      <main className={style.main}>{children}</main>
      <Sidebar />
    </div>
    <footer className={style.footer}>
      ©{config.site.from === 0 ? '' : ` ${config.site.from} - `}
      {new Date().getFullYear() + ' '}
      <FaPlusCircle />
      {' ' + config.site.author}
    </footer>
  </div>
)
