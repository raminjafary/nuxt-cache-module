import { RedisCache } from './plugins/redis'
import { resolve, join } from 'path'
import { readdirSync } from 'fs'
import { serialize, deserialize, shouldCache } from './utils'

module.exports = function Cache (moduleOptions) {
  if (!this.options.render.ssr) {
    return
  }

  const options = {
    ...moduleOptions,
    ...this.options.cache
  }

  let { cacheHeader, namespace } = options

  if (!namespace) {
    namespace = 'cache'
  }

  if (!cacheHeader) {
    cacheHeader = 'x-page-cache'
  }

  if (
    typeof this.options.render.bundleRenderer !== 'object' ||
  this.options.render.bundleRenderer === null
  ) {
    this.options.render.bundleRenderer = {}
  }

  if (this.options.render.bundleRenderer.cache) {
    return
  }

  let redis;

  if (!process.argv.includes('build')) {

    redis = new RedisCache(options)

    this.options.render.bundleRenderer.cache = redis
  }

  const plugins = [
    'components/index.js'
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

  const { pages } = options

  this.nuxt.hook('render:before', (renderer, options) => {
    const renderRoute = renderer.renderRoute.bind(renderer)
    renderer.renderRoute = async function (route, context) {
      async function render (key) {
        const result = await renderRoute(route, context)
        if (!result.error && shouldCache(route, pages)) {
          redis.set(key, serialize(result))
        }
        return result
      }

      if (!shouldCache(route, pages)) {
        return render(route, context)
      }

      const cache = await redis.get(route, value => value)

      try {
        if (cache) {
          context.req.hitCache = true
          return deserialize(cache)
        } else {
          return render(route)
        }
      } catch (err) {
        return render(route)
      }
    }
  })

  this.nuxt.hook('render:route', (url, result, context) => {
    if (context.req.hitCache && cacheHeader) {
      context.cache = redis
      context.res.setHeader(cacheHeader, 'HIT')
    }
  })
}

module.exports.meta = require('../package.json')
