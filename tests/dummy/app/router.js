import Ember from 'ember'
const {Router} = Ember
import config from './config/environment'

var AppRouter = Router.extend({
  location: config.locationType
})

AppRouter.map(function () {
  this.route('demo', {path: '/'})
})

export default AppRouter
