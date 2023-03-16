import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from 'store/index.js'
//公共js
import PubFuc from'./publicjs/common'

Vue.config.productionTip = false

App.mpType = 'app'
//挂载
Vue.use(uView);
Vue.prototype.$pubFuc = PubFuc
const app = new Vue({
    ...App,
	store
})
app.$mount()
