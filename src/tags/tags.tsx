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
    tagsLen: Record<string, number>
  }
}

export default function TagsTemplate({ pageContext }: Props) {
  const { tagsLen } = pageContext
  // logic from https://github.com/hexojs/hexo/blob/3.9.0/lib/plugins/helper/tagcloud.js
  const sizes = Array.from(new Set(Object.values(tagsLen)))

  sizes.sort((a, b) => a - b)
  const length = sizes.length - 1

  useEffect(() => {
    document.title = 'Tags'
  }, [])
  return (
    <Layout>
      <h1 className={style.title}>Tags</h1>
      <main className={style.tags}>
        <div className={style.count}>{Object.keys(tagsLen).length} tags in total</div>
        <article className='article'>
          {Object.keys(tagsLen)
            .sort((a, b) => a.localeCompare(b, config.site.language, { sensitivity: 'base' }))
            .map(tagName => {
              const ratio = sizes.indexOf(tagsLen[tagName]) / length
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
