import React, { PropsWithChildren } from 'react'
import { FaPlusCircle } from '@react-icons/all-files/fa/FaPlusCircle'

import { config } from '@/config'
import { isMobile } from '@/utils'

import { Sidebar } from './sidebar'
import { StaticSide } from './static-side'
import * as style from './layout.module.scss'

interface Props {
  className?: string
}

export const Layout = ({ children, className = '' }: PropsWithChildren<Props>) => (
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
