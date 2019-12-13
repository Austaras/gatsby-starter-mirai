import { BehaviorSubject } from 'rxjs'

export interface TOCTree {
  content: string
  hash: string
  children?: TOCTree[]
}

interface TOCData {
  toc: TOCTree[]
  active: number
}

export const toc$ = new BehaviorSubject<TOCData | undefined>(undefined)
