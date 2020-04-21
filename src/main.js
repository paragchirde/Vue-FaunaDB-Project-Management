import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'

import Toast from "vue-toastification";
import VeeValidate from 'vee-validate';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { VueMasonryPlugin } from 'vue-masonry';

import './assets/bv.scss'
import "vue-toastification/dist/index.css";
import './assets/tailwind.css'
// import "./assets/scss/toastStyles.scss"


Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(VeeValidate);
Vue.use(BootstrapVue)
    // Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueMasonryPlugin)



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')