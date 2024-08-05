import { GatsbyConfig } from 'gatsby'

import { CONFIG } from '../src/config'

interface RssQuery {
  query: {
    site: { siteMetadata: { siteUrl: string } }
    allMarkdownRemark: { nodes: PostData[] }
  }
}

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
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-shiki-twoslash',
            options: {
              theme: 'github-dark'
            }
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
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }: RssQuery) =>
              allMarkdownRemark.nodes.map(node => ({
                ...node.frontmatter,
                description: node.excerpt,
                date: node.frontmatter.date,
                url: site.siteMetadata.siteUrl + node.fields.path,
                guid: site.siteMetadata.siteUrl + node.fields.path,
                custom_elements: [{ 'content:encoded': node.html }]
              })),
            query: `
          {
            allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
              nodes {
                excerpt
                html
                fields {
                  path
                }
                frontmatter {
                  title
                  date
                }
              }
            }
          }
        `,
            output: '/rss.xml',
            title: CONFIG.site.name
          }
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp'
  ]
}
