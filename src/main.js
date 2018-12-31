import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'reset-css';
import '@c/style/ui/ui.scss'
import Alert from '@c/Alert'

Vue.config.productionTip = false
Vue.prototype.$Alert = Alert

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')