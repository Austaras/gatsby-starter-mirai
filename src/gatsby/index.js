require('ts-node').register({
  transpileOnly: true
})

// const { config } = require('./config')
const { createPages } = require('./node')

module.exports = {
  // configAPI,
  createPages
}
