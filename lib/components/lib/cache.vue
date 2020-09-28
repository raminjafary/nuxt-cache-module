<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Cache',
  serverCacheKey: props => props.cache.id + '::' + props.cache.lastUpdated,
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    cache: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
