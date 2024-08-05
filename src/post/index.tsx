import { Component, createRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import 'aplayer/dist/APlayer.min.css'

import * as style from './post.module.scss'

import { LightBox } from './lightbox'

import { Header, Layout, Link, TagList, SEO, TOC } from '@/common'
import { CONFIG } from '@/config'
import { isMobile, isServerSide } from '@/utils'

interface PageLink {
  fields: {
    path: string
  }
  title: string
}

interface Props {
  pageContext: {
    post: Post
    next: PageLink
    prev: PageLink
  }
}

export const Head = ({ pageContext: { post } }: Props) => (
  <SEO
    article={true}
    path={post.fields.path}
    title={post.frontmatter.title}
    description={post.excerpt}
    keywords={post.frontmatter.tags}
  />
)

export default class Template extends Component<Props, { pic: string | undefined }> {
  private toc?: TOCTree[]
  private content = createRef<HTMLDivElement>()
  constructor(props: Props) {
    super(props)
    const toc = this.props.pageContext.post.headings
    if (!isMobile && toc) this.toc = toc
  }
  public shouldComponentUpdate(next: Props) {
    return next.pageContext !== this.props.pageContext
  }
  public async componentDidMount() {
    const player = [...this.content.current!.getElementsByClassName('audio-player')].filter(
      ele => ele.getAttribute('data-player') !== 'plain'
    )
    if (player.length === 0) return
    const { default: Aplayer } = await import('aplayer')
    player.forEach(p => {
      const src = p.getAttribute('src')!
      const [artist, name] = p.getAttribute('data-player')!.split('-')
      const parent = p.parentElement!
      new Aplayer({
        container: parent,
        preload: 'metadata',
        audio: { url: src, theme: '#3b547c', artist, name },
        volume: 1
      })
    })
  }
  public render() {
    const { post, next, prev } = this.props.pageContext
    return (
      <TOC.Provider value={this.toc}>
        {isServerSide && (
          <noscript>
            <style>
              {`.complex-player {
              visibility: visible !important
            }`}
            </style>
          </noscript>
        )}
        <LightBox container={this.content} />
        <Layout>
          <SEO
            article={true}
            path={post.fields.path}
            title={post.frontmatter.title}
            description={post.excerpt}
            keywords={post.frontmatter.tags}
          />

          <article className={style.article} itemScope itemType="http://schema.org/Article">
            <Header
              mtime={new Date(post.parent.mtimeMs)}
              time={new Date(post.frontmatter.date)}
              timeToRead={post.timeToRead}
              title={post.frontmatter.title}
            />
            <link itemProp="mainEntityOfPage" href={CONFIG.site.url + post.fields.path}></link>
            <a hidden href="/about" rel="author">
              {CONFIG.site.author}
            </a>
            <div
              className="content"
              id="content"
              dangerouslySetInnerHTML={{ __html: post.html }}
              ref={this.content}
            />

            <TagList list={post.frontmatter.tags ?? []} />

            <nav className={style.navigation}>
              {prev && (
                <Link to={prev.fields.path} rel="prev">
                  <FaChevronLeft /> {prev.title}
                </Link>
              )}
              <div className={style.spacer}></div>
              {next && (
                <Link to={next.fields.path} rel="next">
                  {next.title} <FaChevronRight />
                </Link>
              )}
            </nav>
          </article>
        </Layout>
      </TOC.Provider>
    )
  }
}
