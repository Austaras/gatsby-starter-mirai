import { useEffect, useRef, useState } from 'react'
import { BehaviorSubject } from 'rxjs'

export const useIntersection = <T extends Element = HTMLElement>(
  cb: IntersectionObserverCallback,
  config?: IntersectionObserverInit | ((e: T) => IntersectionObserverInit)
) => {
  const node = useRef<T>(null)
  const intr = useRef<IntersectionObserver>()
  useEffect(() => {
    if (!node.current) return
    if (!intr.current) {
      intr.current = new IntersectionObserver(cb, config instanceof Function ? config(node.current) : config)
    }
    intr.current.observe(node.current)
    return () => intr.current?.disconnect()
  }, [node.current])
  return node
}

export const useBehavior = <T>(ob: BehaviorSubject<T>) => {
  const [state, set] = useState(() => ob.getValue())
  useEffect(() => {
    const sub = ob.subscribe(t => {
      console.log(t)
      set(t)
    })
    return () => sub.unsubscribe()
  }, [ob])
  return state
}

export const useConstant = <T>(fn: () => T): T => {
  const ref = useRef<any>()
  if (!ref.current) {
    console.log(ref.current)
    console.log('rrr')
    ref.current = fn()
  }
  return ref.current
}
