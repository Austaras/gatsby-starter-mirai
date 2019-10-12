export const pick = <T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> =>
  Object.fromEntries(keys.map(key => [key, obj[key]])) as any

export const omit = <T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, Exclude<keyof T, K>> =>
  keys.reduce((o, key) => {
    delete o[key]
    return o
  }, Object.assign({}, obj))
