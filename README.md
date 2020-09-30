# Nuxt module for ssr cache

**Cache components and pages on the server** 

> :warning: It is yet to be released. Therefore, some implementations are subject to change!

```js
module.exports = {
  buildModules: [
    'nuxt-cache-module'
  ],
  // Module options
  cache: {
    // Enables logging config options in the browser with this.$cache.log()
    debug: true,
    // Routes to be cached on the server. 
    // Another way in the future is by setting `cache` middleware on a certain page.
    // Also patterns would be possible later.
    pages: [
      '/',
      '/about'
    ],
    // You can inject whatever namespace on the root instance.
    // for example by setting namespace to cache, it can be accessed by app.$cache or this.$cache
    namespace: 'cache',
    // Configure redis server
    redis: {
      port: 6379,
      host: 'localhost',
      ttl: 60
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
