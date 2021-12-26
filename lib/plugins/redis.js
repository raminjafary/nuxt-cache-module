import logger from './logger'
import { serialize, deserialize } from '../utils'
import Redis from 'ioredis'

export class RedisCache {
  constructor (options) {
    if (RedisCache.instance) {
      return RedisCache.instance
    }

    const { port, host } = options.redis
    const { ttl } = options

    this.redis = this.initRedis(options.redis)
    this.ttl = ttl || 60
    this.prefix = options.prefix || ''
    this.hash = options.hash || ''

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

  initRedis (options) {
    const redis = new Redis({
      ...options
    })
    return redis
  }

  set (key, value, ttl) {
    const keyLocal = (this.prefix ? `${this.prefix}:` : '') + key + (this.hash ? `:${this.hash}` : '')

    this.redis.set(keyLocal, !key.includes('/') ? serialize(value) : value, (err, result) => {
      if (err) {
        logger.warn(err)
      } else {
        return result
      }
    })
    this.redis.expire(keyLocal, ttl || this.ttl)
  }

  async get (key, callback) {
    const keyLocal = (this.prefix ? `${this.prefix}:` : '') + key + (this.hash ? `:${this.hash}` : '')

    return this.redis.get(keyLocal, (err, result) => {
      if (err) {
        logger.warn(err)
      } else {
        callback(!key.includes('/') ? deserialize(result) : result)
      }
    })
  }

  has (key, callback) {
    const keyLocal = (this.prefix ? `${this.prefix}:` : '') + key + (this.hash ? `:${this.hash}` : '')

    this.redis.exists(keyLocal, (err, result) => {
      if (err) {
        logger.warn(err)
      } else {
        callback(result)
      }
    })
  }
}
