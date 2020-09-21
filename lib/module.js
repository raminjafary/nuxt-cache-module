const consola = require('consola')
const { resolve, join } = require('path')
const { readdirSync } = require('fs')

module.exports = function Process(moduleOptions) {
  const options = {
    ...moduleOptions,
    ...this.options.nuxtCache
  }

  if (!options.namespace) {
    options.namespace = 'nuxtCache'
  }

  const { namespace } = options

  const plugins = [
    'store/index.js',
    'plugins/index.js',
    'components/index.js',
    'middleware/index.js'
  ]
  for (const pathString of plugins) {
    this.addPlugin({
      src: resolve(__dirname, pathString),
      fileName: join(namespace, pathString),
      options
    })
  }
  const foldersToSync = ['plugins', 'store/modules', 'components/lib']

  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join(namespace, pathString, file),
        options
      })
    }
  }
}

module.exports.meta = require('../package.json')
