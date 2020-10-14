# Nuxt Cache Module

**Cache components and pages on the server** 

## Installation

```bash
yarn add @raminjafary/nuxt-cache-module
# or
npm i @raminjafary/nuxt-cache-module
```


```js
module.exports = {
  buildModules: [
    'nuxt-cache-module'
  ],
  // Module options
  cache: {
    // Set cache header on response when it hits cache.
    cacheHeader: 'x-cache',
    // Routes to be cached whether string or regexp.
    pages: [
      /^\/$/,
      /\/about/,
      '/todo'
    ],
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

Component caching is also possible with the `cache` component. The default TTL is 60 seconds.
You can configure `ttl` in module option. A unique `id` and `timestamp` is used as cache key.

```vue
<cache :cache="{ id: 'title', lastUpdated: '1601923810954' }">
  <div>
    Hello World!
  <div>
</cache>
```

Note: you should **NOT** cache a component when:

- It has child components that may rely on global state.
- It has child components that produces side effects on the render context.
- You don't have user-specific content and you opt for page level caching.

For more information see [When to use component caching](https://ssr.vuejs.org/guide/caching.html#component-level-caching).

## License

MIT
