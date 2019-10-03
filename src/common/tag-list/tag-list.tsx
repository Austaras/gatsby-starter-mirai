import React from 'react'

import style from './tag-list.module.scss'

import { Link } from '..'

export const TagList = ({ list = [] }) => (
  <ul className={style.tagList}>
    {list.map(tag => (
      <li key={tag}>
        <Link className={style.tag} to={`/tag/${tag}`}># {tag}</Link>
      </li>
    ))}
  </ul>
)
