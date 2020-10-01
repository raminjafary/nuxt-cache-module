
const logger = require('consola').withScope('nuxt-cache-module')
const Redis = require('ioredis')

export class RedisCache {
  constructor (options) {
    if (RedisCache.instance) {
      return RedisCache.instance
    }

    const { port, host } = options.redis
    const { ttl } = options

    this.redis = this.initRedis(port, host)
    this.ttl = ttl || 60

    this.redis.on('connect', (err) => {
      if (err) {
        logger.error(err)
      } else {
        logger.success(`Redis is connected on port: ${port} and host: ${host}`)
      }
    })

    RedisCache.instance = this
    return this
  }

  initRedis (port, host) {
    const redis = new Redis({
      port,
      host
    })
    return redis
  }

  set (key, value) {
    this.redis.set(key, value, (err, result) => {
      if (err) {
        logger.warn(err)
      } else {
        return result
      }
    })
    this.redis.expire(key, this.ttl)
  }

  get (key, callback) {
    this.redis.get(key, (err, result) => {
      if (err) {
        logger.warn(err)
      } else {
        callback(result)
      }
    })
  }

  has (key, callback) {
    this.redis.exists(key, (err, result) => {
      if (err) {
        logger.warn(err)
      } else {
        callback(result)
      }
    })
  }
}
