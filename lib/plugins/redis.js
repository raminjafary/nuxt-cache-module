
const logger = require('consola').withScope('nuxt-universal-cache')
const Redis = require('ioredis')

export class RedisCache {
  constructor (options) {
    if (RedisCache.instance) {
      return new RedisCache(options)
    }

    const { port, host, ttl } = options.redis

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
        logger.success(`${key} status is : ${result}`)
        return result
      }
    })
    this.redis.expire(key, this.ttl)
  }

  get (key) {
    this.redis.get(key, (err, result) => {
      if (err) {
        logger.warn(err)
      } else {
        logger.success(`${key} value is: ${JSON.stringify(result)}`)
        return result
      }
    })
  }

  has (key) {
    this.redis.exists(key, (err, result) => {
      if (err) {
        logger.warn(err)
      } else {
        logger.success(`${key} : ${result === 1 ? 'exists' : 'does not exists!'}`)
        return result
      }
    })
  }
}
