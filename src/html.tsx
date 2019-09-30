import React from 'react'

import { config } from './config'

interface Props {
  htmlAttributes: object
  headComponents: React.ReactNode
  bodyAttributes: object
  preBodyComponents: React.ReactNode
  body: string
  postBodyComponents: React.ReactNode
}

export default function HTML(props: Props) {
  return (
    <html {...props.htmlAttributes} lang={config.site.language}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <title>{config.site.title}</title>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key='noscript' id='gatsby-noscript'>
          This app works best with JavaScript enabled.
        </noscript>
        <div key={`body`} id='___gatsby' dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}