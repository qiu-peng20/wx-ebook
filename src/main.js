import Vue from 'vue'
import App from './App'
import mpvueRouterPatch from 'mpvue-router-patch'

Vue.use(mpvueRouterPatch)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
