/* eslint-disable @typescript-eslint/camelcase */
const defConfig = {
  template: {
    post: {
      path: ':name',
      date: 'YYYY-MM-DD'
    }
  },
  site: {
    title: 'Mirai',
    author: 'Otaku',
    language: 'en',
    url: 'https://www.gatsbyjs.org',
    root: '/'
  },
  style: {
    menu: [] as string[],
    avatar: undefined as string | undefined,
    per_page: 0,
    time: 'YYYY-MM-DD'
  }
}

type Config = typeof defConfig

function deepMerge<T, R>(a: T, b: R): T & R {
  a = Object.assign(a, b)
  Object.keys(a).forEach(key => {
    if (typeof b[key] === 'object') {
      a[key] = deepMerge(a[key], b[key])
    }
  })
  return a as any
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

let yaml: DeepPartial<Config>
// not bundled by webpack
if (!process.env.NODE_ENV) {
  yaml = require('js-yaml').safeLoad(require('fs').readFileSync('config.yml', 'utf8'))
} else {
  yaml = require('../config.yml')
}

export const config: Config = deepMerge(defConfig, yaml)
export const tools = {
  genPath(format: string, data: { date: Date, name: string }) {

  }
}
