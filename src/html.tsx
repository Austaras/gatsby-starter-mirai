import React, { ReactElement, ReactNode } from 'react'

import { config } from './config'

interface Props {
  htmlAttributes: object
  headComponents: ReactElement[]
  bodyAttributes: object
  preBodyComponents: ReactNode
  body: string
  postBodyComponents: ReactElement[]
}

export default function HTML(props: Props) {
  if (process.env.NODE_ENV === 'production') {
    props.headComponents = props.headComponents.map(component => {
      if (component.type === 'style') {
        return <link rel='stylesheet' href={component.props['data-href']} />
      }
      return component
    })
  }
  return (
    <html {...props.htmlAttributes} lang={config.language}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <title>{config.site.name}</title>
        {props.headComponents}
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700|Raleway:300&display=swap'
        />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key='noscript' id='gatsby-noscript'>
          This app works even with JavsScript disabled, be cool.
        </noscript>
        <div key={`body`} id='___gatsby' dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}
