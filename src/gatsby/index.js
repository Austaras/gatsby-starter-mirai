require('ts-node').register({
  transpileOnly: true
})

const { configApi } = require('./config')
const nodeApi = require('./node')

module.exports = {
  configApi,
  nodeApi
}
