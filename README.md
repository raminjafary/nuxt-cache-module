# Nuxt Cache Module

**Cache components and pages on the server** 

```js
module.exports = {
  buildModules: [
    'nuxt-cache-module'
  ],
  // Module options
  cache: {
    // Enables logging config options in the browser with this.$cache.log().
    debug: true,
    // Set cache header on response when it hits cache.
    cacheHeader: 'x-cache',
    // Routes to be cached whether string or regexp.
    // Another way in the future is by setting `cache` middleware on a certain page.
    pages: [
      /^\/$/,
      /\/about/,
      '/todo'
    ],
    // You can inject whatever namespace on the root instance.
    // For example by setting namespace to cache, it can be accessed by app.$cache or this.$cache.
    namespace: 'cache',
    // Set time to live
    ttl: 60,
    // Configure redis server
    redis: {
      port: 6379,
      host: 'localhost',
    }
  }
}
```

Caching components is also possible with the cache component. The default TTL is 60 seconds.
You can configure `ttl` in module option. A unique id and timestamp is needed to be used as cache key.

```vue
<cache :cache="{ id: 'title', lastUpdated: '2020-09-28T20:34:57.000Z' }">
  <div>
    Hello World!
  <div>
</cache>
```
