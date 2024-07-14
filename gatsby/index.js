require('@swc-node/register/register').register({})

const { configApi } = require('./config')
const nodeApi = require('./node')
const ssrApi = require('./ssr')

module.exports = {
  configApi,
  nodeApi,
  ssrApi
}
