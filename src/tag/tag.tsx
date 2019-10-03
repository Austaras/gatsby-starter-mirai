import React from 'react'
import GatsbyLink from 'gatsby-link'
import { FaHome, FaTags } from 'react-icons/fa'

import { Layout, Link } from '../common'

function Tags({ posts, post, tag }) {
  return (
    <div>
      <h1>Tags</h1>
      <ul className='tags'>
        {Object.keys(posts).map(tagName => (
          <li key={tagName}>
            <GatsbyLink to={`/tags/${tagName}`}>{tagName}</GatsbyLink>
          </li>
        ))}
      </ul>
      <Link to='/'>
        <FaHome /> All posts
      </Link>
    </div>
  )
}

export default function TagsTemplate(props) {
  const { pageContext } = props
  return (
    <Layout>
      <Tags {...pageContext} />
    </Layout>
  )
}
