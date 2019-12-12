import { useEffect, useRef, MutableRefObject } from 'react'

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

export function useConstant<T>(fn: (ref: MutableRefObject<T | undefined>) => T) {
  const ref = useRef<T>()
  if (ref.current === undefined) {
    ref.current = fn(ref)
  }
  return ref.current
}
