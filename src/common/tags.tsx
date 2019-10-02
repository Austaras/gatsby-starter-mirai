import React from 'react'
import Link from 'gatsby-link'

export const Tags = ({ list = [] }) => (
  <ul className='tag-list'>
    {list.map(tag => (
      <li key={tag}>
        <Link to={`/tags/${tag}`}>{tag}</Link>
      </li>
    ))}
  </ul>
)
