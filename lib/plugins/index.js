import persist from './persist'

const options = JSON.parse(`<%= JSON.stringify(options) %>`)
const { namespace } = options

export default ({ store }, inject) => {
  // const { state } = store
  inject(namespace, {
    persist(value) {
      return getState({ store, namespace, value })
    }
  })
}
