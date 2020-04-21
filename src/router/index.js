import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//ortigan
import OrtiganDashboard from '../components/Ortigan/Dashboard.vue'
import OrtiganProjectView from '../components/Ortigan/ProjectView.vue'
import OrtiganLogin from '../components/Ortigan/Auth/Login.vue'
import OrtiganRegister from '../components/Ortigan/Auth/Register.vue'

const routes = [
    // Ortigan
    {
        path: '/',
        name: 'ortigan-dashboard',
        component: OrtiganDashboard,
        props: true,
    },
    {
        path: '/ortigan/project/:id',
        name: 'project-view',
        component: OrtiganProjectView,
        props: true
    },
    {
        path: '/ortigan/login',
        name: 'ortigan-project-login',
        component: OrtiganLogin,
        props: true
    },
    {
        path: '/ortigan/register',
        name: 'ortigan-project-register',
        component: OrtiganRegister,
    },

]

const router = new VueRouter({
    routes,
    mode: 'history',
    linkExactActiveClass: "active",
})

export default router