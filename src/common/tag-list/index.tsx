import React from 'react'

import style from './tag-list.module.scss'

import { Link } from '..'

export const TagList = ({ list = [] as string[] }) => (
  <ul className={`${style.tagList} ${list.length === 0 ? style.hidden : ''}`}>
    {list.map(tag => (
      <li key={tag} property='article:tag'>
        <Link className={style.tag} to={`/tags/${tag}`} rel='tag'>
          # {tag}
        </Link>
      </li>
    ))}
  </ul>
)
