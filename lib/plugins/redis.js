
const logger = require('consola').withScope('nuxt-universal-cache')
const Redis = require('ioredis')

function initRedis(port, host) {
    const redis = new Redis({
        port,
        host,
    })
    return redis
}


export function RedisCache(options) {

    if (!(this instanceof RedisCache)) {
        return new RedisCache(options)
    }

    const { port, host, ttl } = options.redis
    this.redis = initRedis(port, host)

    this.redis.on('connect', (err) => {
        if (err) {
            logger.error(err)
        } else {
            logger.success(`Redis is connected on port: ${port} and host: ${host}`)
        }
    })
}


RedisCache.prototype.set = function set(key, value, ttl = 10) {
    this.redis.set(key, value)
    this.redis.expire(key, ttl)
}

RedisCache.prototype.get = function get(key) {
    this.redis.get(key, (err, result) => {
        if (err) {
            logger.warn(err)
        } else {
            logger.success(`the value in cache is : ${result}`)
            return result
        }
    })
}