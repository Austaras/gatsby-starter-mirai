import { useMemo } from 'react'

import * as style from './tags.module.scss'

import { Layout, Link, SEO } from '@/common'
import { CONFIG } from '@/config'
import '@/styles.scss'
import i18n from '@/i18n'

const sizeCount = 8
const styleMap = new Array(sizeCount).fill(0).map((_, i) => style['tagSize' + i])

export const Head = () => <SEO title="Tags" noindex={true} path="/tags" />

interface Props {
  pageContext: {
    tagsLen: Record<string, number>
  }
}

export default function TagsTemplate({ pageContext: { tagsLen } }: Props) {
  // logic from https://github.com/hexojs/hexo/blob/3.9.0/lib/plugins/helper/tagcloud.js
  const sizes = useMemo(() => {
    const sizes = Array.from(new Set(Object.values(tagsLen)))

    sizes.sort((a, b) => a - b)

    return sizes
  }, [])

  return (
    <Layout>
      <h1 className={style.title}>{i18n.tags.title}</h1>
      <main className={style.tags}>
        <div className={style.count}>
          {i18n.tags.count.replace('%s', Object.keys(tagsLen).length.toString())}
        </div>
        <article className="content">
          {Object.keys(tagsLen)
            .sort((a, b) => a.localeCompare(b, CONFIG.language, { sensitivity: 'base' }))
            .map(tagName => {
              const ratio = sizes.indexOf(tagsLen[tagName]) / (sizes.length - 1)
              const size = Math.round((sizeCount - 1) * ratio)

              const tagSize = styleMap[size]

              return (
                <Link to={`/tags/${tagName}`} className={`${style.tag} ${tagSize}`} key={tagName}>
                  {tagName}
                </Link>
              )
            })}
        </article>
      </main>
    </Layout>
  )
}
