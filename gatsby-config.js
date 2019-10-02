/* eslint-disable */

const { name } = require('./package.json')

module.exports = {
  pathPrefix: process.env.CI ? `/${name}` : `/`,
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Blog Starter',
        short_name: 'Blog',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'assets/favicon.png'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/blog/posts`,
        ignore: ['**/.*'],
        name: 'blog'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/assets`,
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
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp'
  ]
}
