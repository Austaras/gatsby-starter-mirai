import React, { ReactNode } from 'react'
import GatsbyLink from 'gatsby-link'

import style from './link.module.scss'

interface Props {
  className?: string
  activeClassName?: string
  children: ReactNode
  to: string
}

export const Link = ({ activeClassName, children, className = '', to }: Props) => (
  <GatsbyLink
    className={`${style.link} ${className}`}
    activeClassName={activeClassName}
    to={to}
    // it's stupid but I had to deal with it
    partiallyActive={to !== '/'}
  >
    {children}
  </GatsbyLink>
)
