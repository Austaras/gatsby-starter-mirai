/* eslint-disable @typescript-eslint/camelcase */
export type PostMeta = 'create' | 'update' | 'wordcount'
const defConfig = {
  template: {
    path: ':name',
    date: 'YYYY-MM-DD'
  },
  site: {
    name: 'Mirai',
    author: 'Otaku',
    description: undefined as string | undefined,
    keywords: [],
    avatar: undefined as string | undefined,
    from: 0,
    url: 'https://www.gatsbyjs.org',
    root: '/'
  },
  style: {
    menu: [] as string[],
    post_meta: [] as PostMeta[],
    per_page: 0,
    date: 'yyyy-MM-dd',
    month_date: 'MM-dd'
  },
  rsync: undefined as
    | {
        host: string
        user: string
        root: string
        del?: true
        port?: number
      }
    | undefined,
  language: 'en',
  key: 'key'
}

type Config = typeof defConfig

const isObj = (v: any) => Object.prototype.toString.call(v) === '[object Object]'

function patch<R extends any, T extends R>(orig: T, mod: R): T {
  Object.keys(orig).forEach(key => {
    if (isObj(orig[key]) && isObj(mod[key])) {
      return (orig[key] = patch(orig[key], mod[key]))
    }
    if (Object.prototype.hasOwnProperty.call(mod, key)) {
      orig[key] = mod[key]
    }
  })
  return orig
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

let yaml: DeepPartial<Config>
if (process.env.__IS_WEBPACK__) {
  yaml = require('../config.yml')
} else {
  // not bundled by webpack
  yaml = require('js-yaml').safeLoad(require('fs').readFileSync('config.yml', 'utf8'))
}

export const config: Config = patch(defConfig, yaml)
