import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
// import axios from 'axios'
import 'amfe-flexible';
// import cmblapi from './assets/cmblapi.min.js';
// const cmblapi  = require('./assets/cmblapi.min.js')
import './assets/css/base.css'
// import { get, post, put } from './http'
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)
import modal from './components/modal'
Vue.component('modal',modal)
// const devUrl = 'http://newretail.xianfengsg.com/'
// const proUrl = 'http://newretail.xianfengsg.com/'

// const url = process.env.NODE_ENV !== 'production' ? proUrl : devUrl

// process.env.NODE_ENV !== 'production' ? '' : axios.defaults.baseURL = url
// process.uploadUrl = url

// Vue.config.productionTip = false
// axios.defaults.timeout = 600000;
// axios.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'
// axios.interceptors.request.use((config) => {
//     if (!config.headers.hideLoading) {
//         store.commit('loading', true)
//     }
//     // config.headers['token'] = localStorage.getItem('token') // 请求头带上token
//     return config;
// }, (error) => {
//     // Do something with request error
//     return new Promise.reject(error);
// });
// axios.interceptors.response.use((response) => {
//     // Do something before request is sent
//     store.commit('loading', false)
//     console.log('request：', response)
//     if (response.data && response.data.code !== 0) {
//         // if (response.data.code === 401) { // 401, token失效
//         //     sessionStorage.removeItem('token')
//         //     router.push({ name: 'login' })
//         // }
//         // Toast(response.data.message)
//         return Promise.reject(response.data)
//     }
//     return response.data;
// }, (error) => {
//     store.commit('loading', false)
//     console.log(error)
//     return Promise.reject(error);
// })

// Vue.prototype.$get = get
// Vue.prototype.$post = post
// Vue.prototype.$put = put

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
