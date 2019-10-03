import React, { useEffect } from 'react'

import { Layout, Link } from '../common'

export default function TagsTemplate(props) {
  const { pageContext } = props
  console.log(pageContext)
  useEffect(() => {
    document.title = 'Tag'
  }, [])
  return (
    <Layout>
      <div>
        <h1>Tag</h1>
        <ul className='tags'>
          {Object.keys(pageContext.posts).map(tagName => (
            <li key={tagName}>
              <Link to={`/tag/${tagName}`}>{tagName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
