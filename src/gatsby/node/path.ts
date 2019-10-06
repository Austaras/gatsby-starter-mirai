import crypto from 'crypto'

import { config } from '../../config'

const dict: Record<string, (name: string, time: Date) => string> = {
  name: name => name,
  hash: (_, time) =>
    crypto
      .createHash('sha256')
      .update(`${+time}${config.salt}`)
      .digest('hex')
      .slice(0, 12)
}

export function generate(name: string, date: Date) {
  let res = `/${config.template.path}`
  Object.keys(dict).forEach(key => {
    res = res.replace(`:${key}`, dict[key](name, date))
  })
  return res
}
