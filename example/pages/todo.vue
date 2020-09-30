<template>
  <div>
    <nuxt-link to="/">
      back
    </nuxt-link>
    <div v-for="(todo, i) in todos" :key="i">
      {{ todo.title }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData () {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const todos = await response.json()
    return {
      todos
    }
  }
}
</script>
