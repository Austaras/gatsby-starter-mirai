import crypto from 'crypto'

import Slugger from 'github-slugger'

import { config } from '../../src/config'

interface TitleCbData {
  title: string
  filename: string
  time: Date
}

const dict: Record<string, (data: TitleCbData) => string> = {
  title: ({ title }) => title,
  filename: ({ filename }) => filename,
  year: ({ time }) => time.getFullYear().toString(),
  month: ({ time }) => (time.getMonth() + 1).toString(),
  date: ({ time }) => time.getDate().toString(),
  day: ({ time }) => time.getDay().toString(),
  hash: ({ time }) =>
    crypto
      .createHmac('sha256', config.key)
      // a Date object is a Float64, as other number in js
      .update(new Float64Array([time.valueOf()]))
      .digest('hex')
      .slice(0, 12)
}

const slugger = new Slugger()
export function generatePath(node: PostData) {
  let res = config.template.path
  if (!res.startsWith('/')) res = `/${res}`
  Object.keys(dict).forEach(key => {
    res = res.replace(
      `:${key}`,
      dict[key]({
        title: slugger.slug(node.frontmatter.title),
        filename: node.parent.name,
        time: new Date(node.frontmatter.date)
      })
    )
  })
  return res
}

export function generateTree(headings: PostData['headings']) {
  const depth = headings[0].depth
  const result = [] as TOCTree[]
  const stack: TOCTree[] = []
  let currentDepth = 0
  let currentChildren = result
  headings.forEach(h => {
    const hd = h.depth - depth
    if (hd === currentDepth) {
      return currentChildren.push({
        content: h.value,
        hash: slugger.slug(h.value)
      })
    }
    if (hd > currentDepth) {
      for (let i = hd - currentDepth; i > 0; i--) {
        const parent = currentChildren[currentChildren.length - 1]
        if (!parent.children) parent.children = []
        currentChildren = parent.children
        stack.push(parent)
      }
    } else {
      for (let i = hd - currentDepth; i < 0; i++) {
        stack.pop()
      }
      currentChildren = stack.length > 0 ? stack[stack.length - 1].children! : result
    }
    currentDepth = hd
    currentChildren.push({
      content: h.value,
      hash: slugger.slug(h.value)
    })
  })
  slugger.reset()
  return result
}
