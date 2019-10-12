import { GatsbyConfig } from 'gatsby'

import { config } from '../config'

/* eslint-disable @typescript-eslint/camelcase */
export const configApi: GatsbyConfig = {
  pathPrefix: `/`,
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.site.name,
        short_name: config.site.name,
        start_url: config.site.root,
        background_color: '#fff',
        theme_color: '#444',
        display: 'minimal-ui',
        icon: 'assets/favicon.png'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/../../blog`,
        ignore: ['**/.*', '**/_*'],
        name: 'blog'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/../../assets`,
        ignore: ['**/.*'],
        name: 'assets'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- more -->',
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              linkImagesToOriginal: false,
              withWebp: true,
              quality: 100
            }
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              icon: false,
              maintainCase: true
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              showLineNumbers: true,
              noInlineHighlight: true
            }
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow'
            }
          }
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp'
  ]
}
