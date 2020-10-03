import logger from './logger'

const options = JSON.parse('<%= JSON.stringify(options) %>')
const { namespace, debug } = options

export default (context, inject) => {
  inject(namespace, {
    log () {
      if (!debug) {
        logger.info(options)
      } else {
        logger.error('You should first set module `debug` option in nuxt.config.js')
      }
    }
  })
}
