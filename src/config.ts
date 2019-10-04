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
    avatar: undefined as string | undefined,
    from: 0,
    language: 'en',
    url: 'https://www.gatsbyjs.org',
    root: '/'
  },
  style: {
    menu: [] as string[],
    per_page: 0,
    date: 'yyyy-MM-dd',
    month_date: 'MM-dd',
    time: 'yyyy-MM-dd hh:mm:ss'
  }
}

type Config = typeof defConfig

function patch<R extends object, T extends R>(orig: T, mod: R): T {
  Object.keys(orig).forEach(key => {
    if (Object.prototype.toString.call(mod[key]) === '[object Object]') {
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
// not bundled by webpack
if (!process.env.NODE_ENV) {
  yaml = require('js-yaml').safeLoad(require('fs').readFileSync('config.yml', 'utf8'))
} else {
  yaml = require('../config.yml')
}

export const config: Config = patch(defConfig, yaml)

console.log(config)
