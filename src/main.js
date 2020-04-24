import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'

Vue.use(Vuesax)

import Toast from "vue-toastification";
import VeeValidate from 'vee-validate';
import { VueMasonryPlugin } from 'vue-masonry';


//css
import "vue-toastification/dist/index.css";
import './assets/tailwind.css'

import VTooltip from 'v-tooltip'

Vue.use(VTooltip)


Vue.config.productionTip = true
Vue.use(Toast)
Vue.use(VeeValidate);
Vue.use(VueMasonryPlugin)

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({
                path: '/ortigan/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    created() {

    },
    render: h => h(App)
}).$mount('#app')