import path from 'path'
import { CreateBabelConfigArgs, CreatePagesArgs, CreateWebpackConfigArgs } from 'gatsby'

import { createAbout } from './create-about'
import { createIndexPages } from './create-index'
import { createPost } from './create-post'
import { createTagPages } from './create-tag'
import { generatePath } from './utils'

import { config } from '../../src/config'

export const createPages = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions

  createPage({
    path: '/404',
    component: path.resolve('src/404/index.tsx'),
    context: undefined
  })

  const { errors, data } = await graphql<QueryRes>(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { glob: "**/blog/posts/**/*.md" } }
      ) {
        edges {
          node {
            excerpt
            html
            headings {
              depth
              value
            }
            timeToRead
            frontmatter {
              date
              tags
              title
            }
            parent {
              ... on File {
                mtimeMs
                name
              }
            }
          }
        }
      }
    }
  `)
  if (errors) {
    return Promise.reject(errors)
  }

  const posts = data!.allMarkdownRemark.edges.map(({ node }) => {
    node.path = generatePath(node)
    return node
  })

  createTagPages(createPage, posts)
  createPost(createPage, posts)

  await Promise.all([createIndexPages(createPage, graphql), createAbout(createPage, graphql)])
}

const enableCoreJs3 = (config: any) => {
  const coreJs2config = config.resolve.alias['core-js']
  delete config.resolve.alias['core-js']
  config.resolve.alias['core-js/modules'] = `${coreJs2config}/modules`
  try {
    config.resolve.alias['core-js/es'] = path.dirname(require.resolve('core-js/es'))
  } catch (err) {
    // ignore-error, core-js3 isn't available in the current directory
  }

  return config
}

export const onCreateWebpackConfig = ({ plugins, actions, getConfig }: CreateWebpackConfigArgs) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@/i18n': path.resolve(__dirname, `../../src/i18n/${config.language}.yml`),
        '@': path.resolve(__dirname, '../../src')
      }
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-module-eval-source-map',
    plugins: [
      plugins.define({
        'process.env': { __IS_WEBPACK__: JSON.stringify(true) }
      })
    ]
  })

  actions.replaceWebpackConfig(enableCoreJs3(getConfig()))
}
