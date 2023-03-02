import Vue from 'vue'
import App from './App.vue'
//引入vuex
import store from './store'
//引入vuerouter
import VueRouter from "vue-router";
//引入路由器
import router from "./router";
//按需引入element
import element from './plugins/element';

import './api/mock'
Vue.config.productionTip = false

Vue.use(element)
Vue.use(VueRouter)



new Vue({
  el:'#app',
  render: h => h(App),
  router:router,
  store:store
})
