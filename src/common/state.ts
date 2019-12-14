import { useEffect, useRef, useState } from 'react'

interface TOCData {
  toc: TOCTree[]
  active: number
}

type Sub<T> = (arg: T) => void
class StateSubject<T> {
  private subscribition: Sub<T>[] = []
  constructor(public state: T) {}
  public next(ns: T) {
    this.state = ns
    return this.subscribition.forEach(c => c(ns))
  }
  public subscribe(cb: (a: T) => void) {
    this.subscribition.push(cb)
    return () => (this.subscribition = this.subscribition.filter(c => c !== cb))
  }
}

class TOCSubject extends StateSubject<TOCData | undefined> {
  public updateActive(active: number) {
    if (this.state!.active !== active) {
      this.next({...this.state!, active})
    }
  }
}

export const toc$ = new TOCSubject(undefined)
export const showButton$ = new StateSubject<boolean>(false)
export const useSub = <T>(ob: StateSubject<T>) => {
  const [state, set] = useState(ob.state)
  const unsub = useRef<() => void>()
  if (!unsub.current) unsub.current = ob.subscribe(t => set(t))
  useEffect(() => () => unsub.current!(), [ob])
  return state
}
