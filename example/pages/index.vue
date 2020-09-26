<template>
  <div>
    IT WORKS
    <cache :items="{ id: 3, last_updated: '2020-09-30' }">
      <span>cacheble content</span>
    </cache>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$cache.log()
  }
}
</script>
