import React, { useEffect } from 'react'

import { Layout, Link } from '../common'
import { config } from '../config'

interface Props {
  pageContext: string[]
}

export default function TagsTemplate({ pageContext }) {
  const { tags } = pageContext

  useEffect(() => {
    document.title = 'Tags'
  }, [])
  return (
    <Layout>
      <h1>Tag</h1>
      <ul className='tags'>
        {Object.keys(tags)
          .sort((a, b) => a.localeCompare(b, config.site.language, { sensitivity: 'base' }))
          .map(tagName => (
            <li key={tagName}>
              <Link to={`/tag/${tagName}`}>{tagName}</Link>
            </li>
          ))}
      </ul>
    </Layout>
  )
}
