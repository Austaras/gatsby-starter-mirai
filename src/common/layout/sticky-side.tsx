import { Component } from 'react'
import { FaArrowUp } from 'react-icons/fa'

import { calcActive, scrollEvent } from './helper'
import { Site } from './sticky-data'
import { findElement, TOCComp } from './toc'
import * as style from './sticky-side.module.scss'

import { TOC } from '..'

import { isMobile } from '@/utils'
import i18n from '@/i18n'
import { CONFIG } from '@/config'

interface State {
  active: number
  showButton: boolean
  showToc: boolean
}
export class StickySide extends Component<{}, State> {
  private unsub?: () => void
  private intr?: IntersectionObserver
  public static contextType = TOC
  public context: TOCTree[] | undefined = undefined
  public state = {
    active: -1,
    showButton: false,
    showToc: true
  }
  constructor(props: {}) {
    super(props)
  }
  private updateActive(active: number) {
    if (active !== this.state.active) this.setState({ active })
  }
  public componentDidMount() {
    if (isMobile) return
    this.intr = new IntersectionObserver(entr => {
      const showButton = !entr[0].isIntersecting
      if (showButton !== this.state.showButton) this.setState({ showButton })
    })
    const staticSide = document.getElementById('static')!
    this.intr.observe(staticSide)

    if (!this.context) return
    const article = document.getElementById('content')!
    const titles = [...article.querySelectorAll('h1, h2, h3, h4, h5, h6')] as HTMLHeadingElement[]
    const thr = titles.map(t => t.offsetTop - article.offsetTop)
    requestAnimationFrame(() => {
      this.updateActive(calcActive(article, thr))
      this.unsub = scrollEvent(() => calcActive(article, thr))(active => this.updateActive(active))
    })
  }
  public shouldComponentUpdate(_: never, nextState: State) {
    return nextState !== this.state
  }
  public componentWillUnmount() {
    const _ = this.unsub?.()
    return this.intr?.disconnect()
  }
  public render() {
    const toc = this.context
    const { active, showButton, showToc } = this.state
    const up = (
      <div
        className={`${style.back} ${showButton ? style.show : style.hide}`}
        onClick={() => window.scrollTo({ top: 0 })}
        key="key"
      >
        <FaArrowUp />
      </div>
    )
    if (!toc) {
      return (
        <div className={style.stickySide} itemProp="author" itemScope itemType="http://schema.org/Person">
          <Site />
          {up}
        </div>
      )
    }
    const activeToc = findElement(toc, active)
    return (
      <div className={style.stickySide}>
        <ul className={style.tabs}>
          <li
            className={showToc ? style.active : ''}
            onClick={() => !showToc && this.setState({ showToc: true })}
          >
            {i18n.tab.toc}
          </li>
          <li
            className={showToc ? '' : style.active}
            onClick={() => showToc && this.setState({ showToc: false })}
          >
            {i18n.tab.site}
          </li>
        </ul>
        {showToc ? <TOCComp active={activeToc} content={toc} /> : <Site />}
        {up}
      </div>
    )
  }
}
