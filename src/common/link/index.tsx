import React from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'

import * as style from './link.module.scss'

export const Link = (props: Omit<GatsbyLinkProps<void>, 'ref'>) => (
  <GatsbyLink
    {...(props)}
    className={`${style.link} ${props.className ?? ''}`}
    partiallyActive={props.to !== '/'}
  />
)
