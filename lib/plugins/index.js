import logger from './logger'

const options = JSON.parse('<%= JSON.stringify(options) %>')
const { namespace } = options

export default (context, inject) => {
  inject(namespace, {
    log () {
      return logger({ namespace })
    }
  })
}
