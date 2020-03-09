import React, { ReactElement } from 'react'
import { PreRenderHTMLArgs, RenderBodyArgs } from 'gatsby'

export const onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }: PreRenderHTMLArgs) => {
  if (process.env.NODE_ENV !== 'production') return
  const headers = (getHeadComponents() as ReactElement[]).map(component => {
    if (component.type === 'style') {
      // for anchor style
      return component.props['data-href'] ? (
        <link rel='stylesheet' href={component.props['data-href']} />
      ) : null
    }
    if (component.type === 'meta' && component.props.name === 'generator') {
      return <meta name='generator' content='Gatsby' />
    }
    return component
  })
  headers.push(
    <link
      rel='stylesheet'
      href={`https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400&
            family=Raleway:wght@300&display=swap`}
    />
  )
  replaceHeadComponents(headers)
}

export const onRenderBody = ({ setPreBodyComponents }: RenderBodyArgs) => {
  setPreBodyComponents([
    <noscript key='noscript'>This app works even with JavsScript disabled, be cool.</noscript>
  ])
}
