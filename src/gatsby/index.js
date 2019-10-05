require('ts-node').register({
  transpileOnly: true
})

const { configApi } = require('./config')
const { createPages } = require('./node')

module.exports = {
  configApi,
  createPages
}
