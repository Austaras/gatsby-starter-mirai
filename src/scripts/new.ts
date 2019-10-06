import crypto from 'crypto'
import fs from 'fs'
import os from 'os'

import { format } from 'date-fns'

import { config } from '../config'

const time = new Date()

const frontMatter = {
  path: '',
  layout: 'blog',
  title: '',
  date: '',
  tags: '[]'
}

function patch(orig: string, dict: Record<string, string>) {
  if (!orig.includes(':')) return orig
  Object.keys(dict).forEach(key => (orig = orig.replace(`:${key}`, dict[key])))
  return orig
}

function genMd() {
  const [layout, name] = process.argv.slice(2)
  if (!layout || !name) return 'Not enough args!'
  const isFolder = name.endsWith('/')
  const path = isFolder ? name.slice(0, -1) : name
  const folderPath = `blog/${layout}s/${path}/`
  const filePath = `blog/${layout}s/${path}.md`
  if (fs.existsSync(folderPath) || fs.existsSync(filePath)) {
    return 'File already exists!'
  }

  const cfg = config.template
  frontMatter.path = `/${path}`
  frontMatter.title = path

  const dict = {
    hash: crypto
      .createHash('md5')
      .update(`${+time}`)
      .digest('hex'),
    name
  }

  // FIXME:
  if (cfg.date) {
    frontMatter.date = format(time, cfg.date)
  }

  if (cfg.path) {
    frontMatter.path = '/' + patch(cfg.path, dict)
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
