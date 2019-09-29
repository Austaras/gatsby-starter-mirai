import React from 'react'
import { Helmet } from 'react-helmet'

// import '../styles/typography.scss'
import style from '../styles/layout.module.scss'
import { config } from '../config'
import { Siderbar } from './Siderbar'

interface Props {
  children: React.ReactNode
}

export const Layout = ({ children }: Props) => (
  <div className={style.layout}>
    <Helmet title={config.site.title}>
      <html lang={config.site.language} />
    </Helmet>
    <header className={style.header}></header>
    <div className={style.container}>
      <main className={style.main}>{children}</main>
      <Siderbar />
    </div>
  </div>
)
