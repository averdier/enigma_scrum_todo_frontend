import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import backend from '@/services/backend'

Vue.config.productionTip = false

backend.instance.interceptors.response.use(response => response, (error) => {
  if (error.response && error.response.status === 401) {
    store.dispatch('auth/logout')
  }
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
