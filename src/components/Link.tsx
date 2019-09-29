import React from 'react'
import GatsbyLink from 'gatsby-link'

import style from '../styles/link.module.scss'

interface Props {
  className?: string
  activeClassName?: string
  children: React.ReactNode
  to: string
}

export const Link = ({ activeClassName, children, className, to }: Props) => (
  <GatsbyLink className={`${style.link} ${className || ''}`} activeClassName={activeClassName} to={to}>
    {children}
  </GatsbyLink>
)
