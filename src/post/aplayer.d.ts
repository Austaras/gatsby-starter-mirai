declare module 'aplayer' {
  class ReactAplayer extends HTMLDivElement {
    constructor(init: {
      container: HTMLElement
      preload: 'none' | 'metadata' | 'auto'
      audio: {
        url: string
        theme: string
        artist: string
        name: string
      }
      volume: number
    })
  }
  export default ReactAplayer
}
