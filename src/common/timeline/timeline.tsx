import React from 'react'

import style from './timeline.module.scss'

export function Timeline({post}) {
  return (
    <ul className='tags'>
      {post.map(post => (
        <li key={post.id}>{post.frontmatter.title}</li>
      ))}
    </ul>
  )
}
