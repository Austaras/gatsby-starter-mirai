import React, { ReactElement } from 'react'
import { PreRenderHTMLArgs, RenderBodyArgs } from 'gatsby'

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }: PreRenderHTMLArgs) => {
  if (process.env.NODE_ENV !== 'production') return
  const headers = ((getHeadComponents as any)() as ReactElement[]).map(component => {
    if (component.type === 'style') {
      return <link rel='stylesheet' href={component.props['data-href']} />
    }
    if (component.type === 'meta' && component.props.name === 'generator') {
      return <meta name='generator' content='Gatsby' />
    }
    return component
  })
  headers.push(
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700|Raleway:300&display=swap'
    />
  )
  replaceHeadComponents(headers)
}

export const onRenderBody = ({ setBodyAttributes, setPreBodyComponents }: RenderBodyArgs) => {
  // setPreBodyComponents([
  //   <noscript key='noscript'>This app works even with JavsScript disabled, be cool.</noscript>
  // ])
  // setBodyAttributes({
  //   itemscope: 'itemscope',
  //   itemtype: 'http://schema.org/WebPage',
  //   lang: config.language
  // })
}
