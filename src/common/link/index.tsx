import React, { CSSProperties, ReactNode } from 'react'
import GatsbyLink from 'gatsby-link'

import style from './link.module.scss'

interface Props {
  className?: string
  activeClassName?: string
  styleObj?: CSSProperties
  children: ReactNode
  to: string
}

export const Link = ({ activeClassName, children, className = '', styleObj, to }: Props) => (
  <GatsbyLink
    className={`${style.link} ${className}`}
    activeClassName={activeClassName}
    to={to}
    style={styleObj}
    // it's stupid but I had to deal with it
    partiallyActive={to !== '/'}>
    {children}
  </GatsbyLink>
)
