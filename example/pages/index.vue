<template>
  <div>
    <nuxt-link to="/about">
      about
    </nuxt-link>
    <nuxt-link to="/todo">
      todo
    </nuxt-link>
    <cache :cache="{ id: 'title', lastUpdated: new Date().toISOString() }">
      <Title />
    </cache>
  </div>
</template>

<script>
import Title from '../components/title.vue'
export default {
  components: {
    Title
  },
  mounted () {
    this.$cache.log()
  }
}
</script>
