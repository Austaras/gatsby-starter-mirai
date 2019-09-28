import React from 'react'
import GatsbyLink from 'gatsby-link'

import style from '../styles/link.module.scss'

interface Props {
  children: React.ReactNode
  to: string
}

export function Link({ children, to }: Props) {
  return (
    <GatsbyLink className={style.link} to={to}>
      {children}
    </GatsbyLink>
  )
}
