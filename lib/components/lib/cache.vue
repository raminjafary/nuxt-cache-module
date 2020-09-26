<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "unique",
  serverCacheKey: (props) => props.items.id + "::" + props.items.last_updated,
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    items: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
