function moduleStoreExists({ state, namespace, value }) {
  if (!state || state[namespace]) {
    console.error('store not initialized!')
    return false
  }
  return console.log(state[namespace])
}

export default ({ namespace, value }) => {}
