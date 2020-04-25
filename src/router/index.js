import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//ortigan
import Dashboard from '../components/Components/Dashboard.vue'
import ProjectView from '../components/Components/ProjectView.vue'
import Login from '../components/Components/Auth/Login.vue'
import Register from '../components/Components/Auth/Register.vue'

import Users from '../views/Users.vue'

const routes = [
    // Ortigan
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/project/:id',
        name: 'project-view',
        component: ProjectView,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'project-login',
        component: Login,
        props: true
    },
    {
        path: '/register',
        name: 'project-register',
        component: Register,
    },
    {
        path: '/users',
        name: 'users',
        component: Users
    }

]

const router = new VueRouter({
    routes,
    mode: 'history',
    linkExactActiveClass: "active",
})

export default router