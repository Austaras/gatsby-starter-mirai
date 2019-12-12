import { useEffect, useRef } from 'react'

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
