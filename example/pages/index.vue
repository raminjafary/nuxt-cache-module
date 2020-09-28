<template>
  <div>
    <cache :cache="{ id: 'title', lastUpdated: '9/29/2020, 12:04:57 AM' }">
      <Title />
    </cache>
    <cache :cache="{ id: 'dummyText', lastUpdated: '9/29/2020, 12:02:36 AM' }">
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
