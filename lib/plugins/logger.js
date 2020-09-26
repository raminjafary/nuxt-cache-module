const logger = require('consola').withScope('nuxt-universal-cache')
const options = JSON.parse(`<%= JSON.stringify(options) %>`)

const { debug } = options

  export default ({ namespace }) => {
    if (debug) {
      logger.info(options)
    }
  }