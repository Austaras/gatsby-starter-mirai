import React from 'react'
import GatsbyLink from 'gatsby-link'

import '../styles/link.scss'

interface Props {
  children: React.ReactNode
  className?: string
  to: string
}

export default function Link({ children, className, to }: Props) {
  return (
    <GatsbyLink className={`link ${className}`} to={to}>
      {children}
    </GatsbyLink>
  )
}
