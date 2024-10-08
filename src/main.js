import Vue from 'vue'
// import vant from 'vant'
import App from './App.vue'
import router from './route'
import store from './store'
import './permission'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './style//reset.css'
import en from 'element-ui/lib/locale/lang/en'
import service from './utils/http'


import i18n from './language/index.ts'

import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

import VCalendar from 'v-calendar';

import VueElementLoading from "vue-element-loading"

/**
 * vxe-table支持
 */
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// IndexDB封装类库 https://localforage.github.io/localForage/#installation
import localforage from 'localforage'

Vue.use(localforage)

// 将 localforage 挂载到全局示例, 这样就可以在任何地方 用 this.$localforage 操作
Vue.prototype.$localDB = localforage

console.info('localforage初始化成功，使用 this.$localDB 调用')

// 创建一个 默认的 IndexDB数据库挂载到全局
const localDaraBase = localforage.createInstance({
  name: 'localDaraBase'
})

Vue.prototype.$localDaraBase  = localDaraBase 
console.info('默认数据库 localDaraBase  初始化成功，使用 this.$localDaraBase 调用')


Vue.prototype.$axios = service;


Vue.component("VueElementLoading", VueElementLoading)

Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

Vue.use(VXETable)
Vue.use(Element, { locale:en })


Vue.config.productionTip = false

import Vant from 'vant';
import 'vant/lib/index.css';
import '@vant/touch-emulator';


Vue.use(Vant);



new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
