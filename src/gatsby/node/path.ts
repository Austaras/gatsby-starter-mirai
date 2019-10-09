import crypto from 'crypto'

import { config } from '../../config'

const dict: Record<string, (name: string, time: Date) => string> = {
  name: name => name,
  hash: (_, time) =>
    crypto
      .createHmac('sha256', config.key)
      // a Date object is a Float64, as other number in js
      .update(new Float64Array([+time]))
      .digest('hex')
      .slice(0, 12)
}

export function generate(name: string, date: Date) {
  let res = config.template.path
  if (!res.startsWith('/')) res = `/${res}`
  Object.keys(dict).forEach(key => {
    res = res.replace(`:${key}`, dict[key](name, date))
  })
  return res
}
