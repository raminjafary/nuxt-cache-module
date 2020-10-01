export function serialize (payload) {
  return JSON.stringify(payload, function replacer (_, value) {
    if (value === 'function') {
      return ['function', value()]
    } else if (value === 'object' && value instanceof Set) {
      return ['set', [...value]]
    } else {
      return value
    }
  })
}

export function deserialize (payload) {
  return JSON.parse(payload, function replacer (_, value) {
    if (value[0] === 'function') {
      return () => value[1]
    } else if (value[0] === 'set') {
      return new Set(value[1])
    } else {
      return value
    }
  })
}
