import * as style from './tag-list.module.scss'

import { Link } from '..'

// eslint-disable-next-line @eslint-react/no-unstable-default-props
export const TagList = ({ list = [] }) => (
  <ul className={`${style.tagList} ${list.length === 0 ? style.hidden : ''}`}>
    {list.map(tag => (
      <li key={tag} property="article:tag">
        <Link className={style.tag} to={`/tags/${tag}`} rel="tag">
          # {tag}
        </Link>
      </li>
    ))}
  </ul>
)
