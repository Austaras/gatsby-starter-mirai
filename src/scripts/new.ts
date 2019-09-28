import crypto from 'crypto'
import fs from 'fs'
import os from 'os'

import moment from 'moment'

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
  // eslint-disable-next-line
  if (!layout || !name) return 'Not enough args!'
  const filePath = `blog/${name}`
  if (fs.existsSync(filePath)) {
    return 'File already exists!'
  }

  const cfg = config.template[layout]
  const isFolder = name.endsWith('/')
  const path = isFolder ? name.slice(0, -1) : name
  frontMatter.path = `/${path}`
  frontMatter.title = path

  const dict = {
    hash: crypto
      .createHash('md5')
      .update(`${+time}`)
      .digest('hex'),
    name
  }

  if (cfg.date) {
    frontMatter.date = moment(time).format(cfg.date)
  }

  if (cfg.path) {
    frontMatter.path = '/' + patch(cfg.path, dict)
  }
  const frontStr = Object.entries(frontMatter)
    .map(([key, val]) => `${key}: ${val}`)
    .join(os.EOL)
  const md = `---${os.EOL}${frontStr}${os.EOL}---`
  if (isFolder) {
    fs.mkdirSync(filePath)
    fs.writeFileSync(filePath + path + '.md', md)
  } else {
    fs.writeFileSync(filePath + '.md', md)
  }
  return ''
}

const res = genMd()
if (res !== '') {
  console.log(res)
}
