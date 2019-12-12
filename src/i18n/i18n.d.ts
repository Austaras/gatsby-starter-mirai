declare module '@/i18n' {
  type StringWithParam = string
  const i18n: {
    readmore: string
    menu: Record<'home' | 'tag' | 'archive' | 'about', string>
    sidebar: Record<'post' | 'tag', string>
    header: {
      postOn: string
      timeToRead: StringWithParam
    }
    tags: {
      title: string
      count: StringWithParam
    }
    tab: {
      toc: string
      site: string
    }
    about: string
  }
  export default i18n
}
