const path = require('path')

module.exports = {
  srcDir: path.resolve(__dirname),
  rootDir: path.resolve(__dirname, '..'),

  buildModules: [
    {
      handler: require('../')
    }
  ],
  nuxtCache: {
    debug: true,
    namespace: 'nuxtCache'
  }
}
