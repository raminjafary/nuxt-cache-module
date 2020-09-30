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
    debug: true,
    pages: [
      '/',
      '/about'
    ],
    namespace: 'cache',
    redis: {
      port: 6379,
      host: 'localhost',
      ttl: 60
    }
  }
}
