import crypto from 'crypto'

import Slugger from 'github-slugger'

import { config } from '../../src/config'

const dict: Record<string, (title: string, time: Date) => string> = {
  title: title => title,
  hash: (_, time) =>
    crypto
      .createHmac('sha256', config.key)
      // a Date object is a Float64, as other number in js
      .update(new Float64Array([time.valueOf()]))
      .digest('hex')
      .slice(0, 12)
}

export function generatePath(title: string, date: Date) {
  let res = config.template.path
  if (!res.startsWith('/')) res = `/${res}`
  Object.keys(dict).forEach(key => {
    res = res.replace(`:${key}`, dict[key](title, date))
  })
  return res
}

const slugger = new Slugger()
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
