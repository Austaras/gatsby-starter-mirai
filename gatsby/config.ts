import { GatsbyConfig } from 'gatsby'

import { CONFIG } from '../src/config'

export const configApi: GatsbyConfig = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: CONFIG.site.url
  },
  jsxRuntime: 'automatic',
  jsxImportSource: 'preact/compat',
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-preact',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: CONFIG.site.name,
        short_name: CONFIG.site.name,
        start_url: CONFIG.site.root,
        background_color: '#fff',
        theme_color: '#444',
        display: 'minimal-ui',
        icon: CONFIG.site.favicon ? `assets/${CONFIG.site.favicon}` : undefined
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
              withAvif: true,
              quality: 100
            }
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              showLineNumbers: true,
              noInlineHighlight: true
            }
          },
          // {
          //   resolve: 'gatsby-remark-external-links',
          //   options: {
          //     target: '_blank'
          //   }
          // },
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
        excludes: ['/archive', '/tags', '/tags/*']
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet-async',
    'gatsby-plugin-sharp'
  ]
}
