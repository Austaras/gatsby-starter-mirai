import React from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'

import style from './link.module.scss'

export const Link = (props: GatsbyLinkProps<void>) => (
  <GatsbyLink
    {...(props as any)}
    className={`${style.link} ${props.className ?? ''}`}
    partiallyActive={props.to !== '/'}
  />
)
