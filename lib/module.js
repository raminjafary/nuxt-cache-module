import { RedisCache } from './plugins/redis'
const { resolve, join } = require('path')
const { readdirSync } = require('fs')

module.exports = function Cache (moduleOptions) {
  if (!this.options.render.ssr) {
    return
  }

  const options = {
    ...moduleOptions,
    ...this.options.cache
  }

  if (!options.namespace) {
    options.namespace = 'cache'
  }

  const { namespace } = options

  if (typeof this.options.render.bundleRenderer !== 'object' || this.options.render.bundleRenderer === null) {
    this.options.render.bundleRenderer = {}
  }

  if (this.options.render.bundleRenderer.cache) {
    return
  }

  const redis = new RedisCache(options)

  this.options.render.bundleRenderer.cache = redis

  const plugins = [
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

  this.nuxt.hook('render:before', (renderer, options) => {
    const renderRoute = renderer.renderRoute.bind(renderer)
    renderer.renderRoute = function (route, context) {
      async function render (key) {
        const result = await renderRoute(route, context)
        redis.set(key, JSON.stringify(result))
        return result
      }
      const cache = redis.get(route, value => value)

      try {
        if (cache) {
          context.req.hitCache = true
          return JSON.parse(cache)
        } else {
          return render(route)
        }
      } catch (err) {
        return render(route)
      }
    }
  })

  this.nuxt.hook('render:route', (url, result, context) => {
    if (context.req.hitCache) {
      context.res.setHeader('x-page-cache', 'hit')
    }
  })
}

module.exports.meta = require('../package.json')
