import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketio from "../node_modules/vue-socket.io"
import socketio from "../node_modules/socket.io-client"
import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import animated from "animate.css"
import axios from  "axios"
Vue.prototype.$axios=axios;
// Vue.use(VueSocketio,socketio('http://localhost:3001/'))
Vue.use(new VueSocketio({
  debug:true,
  connection:"http://localhost:3001/"
}))
Vue.use(MintUI);
Vue.use(ElementUI);
Vue.use(animated);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
