declare module '@/i18n' {
  type StringWithParam = string
  const i18n: {
    readmore: string
    menu: Record<'home' | 'tags' | 'archive' | 'about', string>
    sidebar: Record<'post' | 'tag', string>
    header: {
      poston: string
    }
    tags: {
      title: string
      count: StringWithParam
    }
    about: string
  }
  export default i18n
}
