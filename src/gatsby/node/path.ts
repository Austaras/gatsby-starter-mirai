import crypto from 'crypto'

import { config } from '../../config'

const dict: Record<string, (title: string, time: Date) => string> = {
  title: title => title,
  hash: (_, time) =>
    crypto
      .createHmac('sha256', config.key)
      // a Date object is a Float64, as other number in js
      .update(new Float64Array([time.valueOf()]))
      .digest('hex')
      .slice(0, 12)
}

export function generate(title: string, date: Date) {
  let res = config.template.path
  if (!res.startsWith('/')) res = `/${res}`
  Object.keys(dict).forEach(key => {
    res = res.replace(`:${key}`, dict[key](title, date))
  })
  return res
}
