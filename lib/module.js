const { resolve, join } = require('path')
const { readdirSync } = require('fs')
// import { RedisCache } from './plugins/redis'
 
module.exports = function Cache(moduleOptions) {

  if (!this.options.render.ssr) {
    return
  }

  console.log(this.options.render.bundleRenderer);

  const options = {
    ...moduleOptions,
    ...this.options.cache
  }

  if (!options.namespace) {
    options.namespace = 'cache'
  }

  const { namespace } = options

  const plugins = [
    'plugins/index.js',
    'components/index.js',
  ]

  for (const pathString of plugins) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(namespace, pathString),
      options
    })
  }

  const foldersLocations = ['plugins', 'components/lib']

  for (const location of foldersLocations) {
    const path = resolve(__dirname, location)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, location, file),
        options
      })
    }
  }
}

module.exports.meta = require('../package.json')
