const logger = require('consola').withScope('nuxt-cache-module')
const options = JSON.parse('<%= JSON.stringify(options) %>')

const { debug } = options

export default ({ namespace }) => {
  if (debug) {
    logger.info(options)
  }
}
