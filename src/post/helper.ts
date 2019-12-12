export interface TOCTree {
  content: string
  hash: string
  children?: TOCTree[]
}

export const calcActive = (curr: number, thr: number[]) => {
  if (curr < thr[0]) return -1
  for (let i = 0; i < thr.length - 1; i++) {
    if (thr[i] <= curr && curr < thr[i + 1]) {
      return i
    }
  }
  return thr.length - 1
}

function getDepth(h: HTMLHeadingElement) {
  return +h.nodeName.slice(-1)
}

export function generateTree(headings: HTMLHeadingElement[]) {
  if (headings.length === 0) return
  const depth = getDepth(headings[0])
  const result = [] as TOCTree[]
  const stack: TOCTree[] = []
  let currentDepth = 0
  let currentChildren = result
  headings.forEach(h => {
    const hd = getDepth(h) - depth
    if (hd === currentDepth) {
      return currentChildren.push({
        content: h.textContent!,
        hash: h.id
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
      content: h.textContent!,
      hash: h.id
    })
  })
  return result
}
