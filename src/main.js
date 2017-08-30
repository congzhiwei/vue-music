// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import {store} from './store/store'

Vue.config.productionTip = false

Vue.use(VueResource)

Vue.http.options.root = '/static/data/'
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
