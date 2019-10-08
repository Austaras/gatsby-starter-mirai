export const pick = <T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> =>
  Object.fromEntries(keys.map(key => [key, obj[key]])) as any
