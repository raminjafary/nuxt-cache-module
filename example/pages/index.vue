<template>
  <div>
    <nuxt-link to="/about">
      about
    </nuxt-link>
    <nuxt-link to="/todo">
      todo
    </nuxt-link>
    <cache :cache="{ id: 'title', lastUpdated: '1601928698704' }">
      <Title />
    </cache>
  </div>
</template>

<script>
import Title from '../components/title.vue'
export default {
  components: {
    Title
  }
}
</script>
