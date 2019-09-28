import React from 'react'
import Link from 'gatsby-link'
import { Helmet } from 'react-helmet'

import '../styles/typography.scss'
import style from '../styles/layout.module.scss'
import { config } from '../config'

interface Props {
  location: Location
  children: React.ReactNode
}

export function Layout({ location, children }: Props) {
  const isRoot = location.pathname === '/'

  return (
    <>
      <Helmet title={config.site.title}>
        <html lang={config.site.language} />
      </Helmet>
      <div className={style.layout}>{children}</div>
    </>
  )
}
