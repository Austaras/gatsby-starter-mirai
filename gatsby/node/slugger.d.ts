declare module 'github-slugger' {
  export default class Sluffer {
    public reset(): void
    public slug(raw: string): string
  }
}
