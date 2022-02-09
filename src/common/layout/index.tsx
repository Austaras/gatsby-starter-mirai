import { PropsWithChildren } from 'react'
import { FaPlusCircle } from 'react-icons/fa'

import { Sidebar } from './sidebar'
import { StaticSide } from './static-side'
import * as style from './layout.module.scss'

import { isMobile } from '@/utils'
import { CONFIG } from '@/config'

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
      ©{CONFIG.site.from === 0 ? '' : ` ${CONFIG.site.from} - `}
      <span itemProp="copyrightYear">{new Date().getFullYear()}</span>
      <FaPlusCircle />
      <span itemProp="copyrightHolder">{CONFIG.site.author}</span>
    </footer>
  </div>
)
