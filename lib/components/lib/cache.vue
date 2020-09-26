<template>
  <div>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Unique',
  serverCacheKey: props => props.items.id + '::' + props.items.last_updated,
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    items: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
