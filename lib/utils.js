export function serialize (payload) {
  return JSON.stringify(payload, function replacer (_, value) {
    if (value === 'function') {
      return ['function', value()]
    }
    if (value === 'object' && value instanceof Set) {
      return ['set', [...value]]
    }
    return value
  })
}

export function deserialize (payload) {
  return JSON.parse(payload, function replacer (_, value) {
    if (Array.isArray(value) && value.length === 2) {
      if (value[0] === 'function') {
        return () => value[1]
      }

      if (value[0] === 'set') {
        return new Set(value[1])
      }
    }
    return value
  })
}

export function shouldCache (match, patternsList) {
  return patternsList.some((pattern) => {
    if (pattern instanceof RegExp) {
      return pattern.test(match)
    } else {
      return match.startsWith(pattern)
    }
  })
}

export function customTTL(match, patternsList) {

  let ttl = 0

  Object.keys(patternsList).some((pattern) => {

    const re = new RegExp(pattern)

    if (re.test(match)) {
      ttl = patternsList[pattern]
      return true
    }

    return false
  })

  return ttl
}
