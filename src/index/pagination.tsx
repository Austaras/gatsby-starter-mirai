import React, { ReactElement } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

import style from './pagination.module.scss'
import { Link } from '../common'

export function Pagination({ count, current }: PageConf) {
  console.log(count, current)
  const children: ReactElement[] = []
  if (count !== 1) {
    for (let i = 1; i <= count; i++) {
      children.push(
        i === current ? (
          <span className={style.number} key={i}>
            {i}
          </span>
        ) : (
          <Link to={`/page/${i}`} className={style.number} key={i}>
            {i}
          </Link>
        )
      )
    }
    if (current !== 1) {
      children.unshift(
        <Link to={`/page/${current - 1}`} className={style.number} key={'left'}>
          <FaAngleLeft />
        </Link>
      )
    }
    if (current !== count) {
      children.push(
        <Link to={`/page/${current + 1}`} className={style.number} key={'right'}>
          <FaAngleRight />
        </Link>
      )
    }
  }

  return <nav className={style.pagination}>{children}</nav>
}
