import React, { useEffect } from 'react'

import { Layout, Link } from '../common'
import { config } from '../config'

import style from './tags.module.scss'

const MIN = 14,
  MAX = 32
const START = [0xcc, 0xcc, 0xcc],
  END = [0x11, 0x11, 0x11]
const mix = (a: number, b: number, ratio: number) => Math.round(a + (b - a) * ratio)

interface Props {
  pageContext: {
    tags: Record<string, Post[]>
  }
}

export default function TagsTemplate({ pageContext }: Props) {
  const { tags } = pageContext
  // logic from https://github.com/hexojs/hexo/blob/3.9.0/lib/plugins/helper/tagcloud.js
  const sizes = Array.from(
    Object.keys(tags).reduce((set, key) => {
      set.add(tags[key].length)
      return set
    }, new Set<number>())
  )

  sizes.sort((a, b) => a - b)
  const length = sizes.length - 1

  useEffect(() => {
    document.title = 'Tags'
  }, [])
  return (
    <Layout>
      <h1 className={style.title}>Tags</h1>
      <main className={style.tags}>
        <div className={style.count}>{Object.keys(tags).length} tags in total</div>
        <article className='article'>
          {Object.keys(tags)
            .sort((a, b) => a.localeCompare(b, config.site.language, { sensitivity: 'base' }))
            .map(tagName => {
              const ratio = sizes.indexOf(tags[tagName].length) / length
              const size = mix(MIN, MAX, ratio)
              const color = START.map((v, i) => mix(v, END[i], ratio).toString(16))
              const styleObj = {
                fontSize: `${size}px`,
                color: `#${color.join('')}`
              }
              return (
                <Link to={`/tag/${tagName}`} className={style.tag} styleObj={styleObj} key={tagName}>
                  {tagName}
                </Link>
              )
            })}
        </article>
      </main>
    </Layout>
  )
}
