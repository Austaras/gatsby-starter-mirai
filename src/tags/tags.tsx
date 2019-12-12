import React from 'react'
import {Helmet} from 'react-helmet-async'

import style from './tags.module.scss'

import { Layout, Link } from '@/common'
import { config } from '@/config'
import '@/styles.scss'
import i18n from '@/i18n'

const MIN = 14,
  MAX = 32
const START = new Array<number>(3).fill(0xcc),
  END = new Array<number>(3).fill(0x11)
const mix = (a: number, b: number, ratio: number) => Math.round(a + (b - a) * ratio)

interface Props {
  pageContext: {
    tagsLen: Record<string, number>
  }
}

export default function TagsTemplate({ pageContext: { tagsLen } }: Props) {
  // logic from https://github.com/hexojs/hexo/blob/3.9.0/lib/plugins/helper/tagcloud.js
  const sizes = Array.from(new Set(Object.values(tagsLen)))

  sizes.sort((a, b) => a - b)
  const length = sizes.length - 1

  return (
    <Layout>
      <Helmet>
        <title>Tags</title>
      </Helmet>
      <h1 className={style.title}>{i18n.tags.title}</h1>
      <main className={style.tags}>
        <div className={style.count}>
          {i18n.tags.count.replace('%s', Object.keys(tagsLen).length.toString())}
        </div>
        <article className='article'>
          {Object.keys(tagsLen)
            .sort((a, b) => a.localeCompare(b, config.language, { sensitivity: 'base' }))
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
