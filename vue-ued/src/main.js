// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
import 'babel-polyfill'
import $ from 'jquery'

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)

//记录路由 ->
let routeList = [];
let fromRoute;
router.beforeEach((to, from, next) => {
    var pathIndex = routeList.indexOf(from.path)
    if (from.name) {
        sessionStorage.setItem('fromName', from.name);
    }
    if (from.path) {
        sessionStorage.setItem('fromPath', from.path);
    }
    if (from.meta.title) {
        sessionStorage.setItem('fromTitle', from.meta.title);
    }
    fromRoute = {
        name: sessionStorage.getItem('fromName'),
        path: sessionStorage.getItem('fromPath'),
        title: sessionStorage.getItem('fromTitle')
    };
    if (pathIndex !== -1) {
        //如果存在路由列表，则把之后的路由都删掉
        routeList.splice(index + 1, routeList.length - index - 1)
    } else {
        routeList.push(fromRoute)
    }
    next()
})
router.afterEach(function(to, from, next) {
        if (from.path != to.path) {
            store.state.breadListState = [fromRoute]
        }
    })
    //记录路由 <-

const jsonBird = 'https://bird.ioliu.cn/v1/?url='
const zhihu = 'http://testued.light.fang.com/'

Vue.prototype.$url = `${jsonBird}${zhihu}`
Vue.prototype.$http = axios
Vue.filter('imageUrlPrefix', (value) => {
    const url = value.substr(7)
    const prefix = 'https://images.weserv.nl/?url='
    return prefix + url
  })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})