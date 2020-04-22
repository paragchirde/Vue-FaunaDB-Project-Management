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


Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(VeeValidate);
Vue.use(VueMasonryPlugin)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')