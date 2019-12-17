import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path:'/',
            component:()=>import('./views/index')
        },
        {
            path:'/download',
            component:()=>import('./views/download')
        },
        {
            path:'/bindphone',
            component:()=>import('./views/bindphone')
        },
    ]
})
