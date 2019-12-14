export const calcActive = (ele: HTMLElement, thr: number[]) => {
  const curr = -ele.getBoundingClientRect().top + 90
  if (curr < thr[0]) return -1
  for (let i = 0; i < thr.length - 1; i++) {
    if (thr[i] <= curr && curr < thr[i + 1]) {
      return i
    }
  }
  return thr.length - 1
}

export const scrollEvent = (map: () => number) => {
  let value: number | undefined
  return (cb: (t: number) => void) => {
    const ev = () => {
      if (value === undefined) {
        setTimeout(() => {
          cb(value!)
          value = undefined
        }, 64)
        value = map()
      } else {
        value = map()
      }
    }
    document.addEventListener('scroll', ev)
    return () => document.removeEventListener('scroll', ev)
  }
}
