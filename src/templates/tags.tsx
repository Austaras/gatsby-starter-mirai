import React from 'react'
import GatsbyLink from 'gatsby-link'
import { FaHome, FaTags } from 'react-icons/fa'

import Layout from '../components/Layout'
import Link from '../components/Link'

import '../styles/tags.scss'

function Tags({ posts, post, tag }) {
  if (tag) {
    return (
      <div>
        <h1>
          {post.length} post{post.length === 1 ? '' : 's'} tagged with {tag}
        </h1>
        <ul>
          {post.map(({ id, frontmatter, excerpt }) => {
            return (
              <li key={id}>
                <h1>
                  <GatsbyLink to={frontmatter.path}>{frontmatter.title}</GatsbyLink>
                </h1>
                <p>{excerpt}</p>
              </li>
            )
          })}
        </ul>
        <Link to='/tags'>
          <FaTags /> All tags
        </Link>
      </div>
    )
  }
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
    <Layout {...props}>
      <Tags {...pageContext} />
    </Layout>
  )
}
