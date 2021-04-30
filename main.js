import Vue from 'vue'
import App from './App'
import ajax from '@/common/ajax'
Vue.config.productionTip = false;

import store from "./store"
Vue.prototype.$store = store;

import  '@/common/filters.js'

import tools from '@/common/tools.js'
Vue.prototype.$tools=tools

// import _ from '@/common/lodash.js'   // 直接引入大于500KB的js包 影响性能
// Vue.prototype._=_


// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView)

// 引入uView提供的对vuex的简写法文件
// let vuexStore = require('@/store/$u.mixin.js')
// Vue.mixin(vuexStore)

App.mpType = 'app'
Vue.prototype.$Ajax = ajax;




const app = new Vue({
    ...App
})
app.$mount()
