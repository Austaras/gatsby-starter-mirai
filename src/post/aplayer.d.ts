declare module 'aplayer' {
  class Aplayer {
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
  export default Aplayer
}
