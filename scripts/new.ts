import fs from 'fs'
import os from 'os'

import { format } from 'date-fns'

import { CONFIG } from '../src/config'

const time = new Date()

const frontMatter = {
  title: '',
  date: '',
  tags: '[]'
}

function genMd() {
  const name = process.argv.slice(2)[0]
  if (!name) return 'Not enough args!'
  const isFolder = name.endsWith('/')
  const path = isFolder ? name.slice(0, -1) : name
  const folderPath = `blog/posts/${path}/`
  const filePath = `blog/posts/${path}.md`
  if (fs.existsSync(folderPath) || fs.existsSync(filePath)) {
    return 'File already exists!'
  }

  const cfg = CONFIG.template
  frontMatter.title = path

  if (cfg.date) {
    frontMatter.date = format(time, cfg.date)
  }

  const frontStr = Object.entries(frontMatter)
    .map(([key, val]) => `${key}: ${val}`)
    .join(os.EOL)
  const md = `---${os.EOL}${frontStr}${os.EOL}---`
  if (isFolder) {
    fs.mkdirSync(folderPath)
    fs.writeFileSync(folderPath + 'index.md', md)
  } else {
    fs.writeFileSync(filePath, md)
  }
  return ''
}

const res = genMd()
if (res !== '') {
  console.error(res)
}
