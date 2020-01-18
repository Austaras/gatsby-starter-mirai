declare module '@/i18n' {
  type StringWithParam = string
  const i18n: {
    readmore: string
    menu: Record<'home' | 'tags' | 'archive' | 'about', string>
    sidebar: Record<'post' | 'tags', string>
    header: {
      createOn: string
      updateOn: string
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
