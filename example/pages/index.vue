<template>
  <div>
    <cache :cache="{ id: 'title', lastUpdated: '2020-09-28T20:34:57.000Z' }">
      <Title />
    </cache>
    <cache :cache="{ id: 'dummyText', lastUpdated: '2020-09-28T20:32:36.000Z' }">
      this is going to be cached..!
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
