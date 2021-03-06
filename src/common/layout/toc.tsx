import React from 'react'

import * as style from './toc.module.scss'

export function findElement(tree: TOCTree[], active: number) {
  const set = new Set<TOCTree>()
  if (active === -1) return set
  const root = ({ children: tree } as any) as TOCTree
  const stack: [TOCTree, number][] = []
  let current = root
  let count = 0
  let index = 0
  while (count < active + 1) {
    const next = current.children?.[index]
    if (next) {
      stack.push([current, index + 1])
      count++
      index = 0
      current = next
    } else {
      const [prev, i] = stack.pop()!
      index = i
      current = prev
    }
  }
  set.add(current)
  while (stack.length > 1) {
    set.add(stack.pop()![0])
  }
  return set
}

interface TOCProps {
  content: TOCTree[]
  active: Set<TOCTree>
}
export const TOCComp = ({ active, content }: TOCProps) =>
  content ? (
    <ul className={style.toc}>
      {content.map(c => (
        <li key={c.hash}>
          <a href={'#' + c.hash} key='link' className={active.has(c) ? style.active : ''}>
            {c.content}
          </a>
          {c.children && active.has(c) && <TOCComp active={active} content={c.children} key='list' />}
        </li>
      ))}
    </ul>
  ) : null
