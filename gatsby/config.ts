import { GatsbyConfig } from 'gatsby'

import { config } from '../src/config'

/* eslint-disable @typescript-eslint/camelcase */
export const configApi: GatsbyConfig = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: config.site.url
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          localIdentName: '[local]--[hash:base64:5]'
        },
      },
    },
    'gatsby-plugin-preact',
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
        path: `${__dirname}/../blog`,
        ignore: ['**/.*', '**/_*'],
        name: 'blog'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/../assets`,
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
              icon: false
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
              target: '_blank'
            }
          },
          {
            resolve: require.resolve('./remark-audio')
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [
          { userAgent: '*', allow: '/' },
          { userAgent: 'Baiduspider', disallow: '/' }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/archive', '/tags', '/tags/*']
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet-async',
    'gatsby-plugin-sharp'
  ]
}
