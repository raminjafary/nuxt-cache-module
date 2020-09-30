import Middleware from '../../middleware'
const options = JSON.parse('<%= JSON.stringify(options) %>')
const { namespace } = options

Middleware[namespace] = (context) => {

}
