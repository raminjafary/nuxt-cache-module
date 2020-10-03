import logger from './logger'

const options = JSON.parse(`<%= JSON.stringify(options, function replacer (_, v) {
  if (v instanceof RegExp) {
    v =  v.toString()
    return ['regexp', v.substring(1, v.length - 1)]
  }
  return v
}) %>`, function replacer (_, v) {
  if (Array.isArray(v) && v.length === 2) {
    return new RegExp(v[1])
  }
  return v
})

const { namespace, debug } = options

export default (context, inject) => {
  inject(namespace, {
    log () {
      if (debug) {
        logger.info(options)
      } else {
        logger.error('You should first set module `debug` option in nuxt.config.js')
      }
    }
  })
}
