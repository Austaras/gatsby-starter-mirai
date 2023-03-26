import fs from 'fs-extra'
import path from 'path'

import type { Literal } from 'mdast'
import visit from 'unist-util-visit'

interface File {
  internal: {
    contentDigest: string
  }
  base: string
  absolutePath: string
}

const processed = new Map<File, string>()
let todo: [string, string][] = []
function getPath(file: File) {
  let dest = processed.get(file)
  if (dest) return dest
  dest = `static/${file.internal.contentDigest}/${file.base}`
  processed.set(file, dest)
  todo.push([file.absolutePath, path.join(process.cwd(), 'public', dest)])
  return dest
}

interface Param {
  markdownAST: Literal
  files: File[]
  markdownNode: {
    parent: string
  }
  getNode: (node: string) => { dir: string }
}
export default ({ markdownAST, markdownNode, files, getNode }: Param) => {
  todo = []
  visit(markdownAST, 'inlineCode', (node: Literal) => {
    const { value } = node

    if (value.startsWith('audio: ')) {
      const text = value.slice(7)
      const split = text.indexOf(' ')
      const name = text.slice(0, split)
      const data = text.slice(split + 1)
      const uri = path.join(getNode(markdownNode.parent).dir, name)
      const resource = files.find(f => f.absolutePath === uri)
      if (!resource) return
      const newPath = getPath(resource)
      node.type = 'html'
      node.value = `<audio src="/${newPath}" controls class="audio-player${
        data === 'plain' ? '' : ' complex-player'
      }" data-player=${data}></audio>`
    }
  })
  return Promise.all(
    todo.map(async ([oldPath, newPath]) => {
      if (!fs.existsSync(newPath)) {
        try {
          await fs.ensureDir(path.dirname(newPath))
          await fs.copy(oldPath, newPath)
        } catch (err) {
          console.error('error copying file', err)
        }
      }
    })
  )
}
