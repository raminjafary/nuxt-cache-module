const path = require('path')

module.exports = {
  srcDir: path.resolve(__dirname),
  rootDir: path.resolve(__dirname, '..'),

  buildModules: [
    {
      handler: require('../')
    }
  ],
  cache: {
    cacheHeader: 'x-cache',
    pages: [
      /^\/$/,
      /\/about/,
      '/todo'
    ],
    namespace: 'cache',
    ttl: 60,
    redis: {
      port: 6379,
      host: 'localhost'
    }
  }
}
