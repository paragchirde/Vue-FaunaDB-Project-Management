import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//ortigan
import Dashboard from '../components/VueFauna/Dashboard.vue'
import ProjectView from '../components/VueFauna/ProjectView.vue'
import Login from '../components/VueFauna/Auth/Login.vue'
import Register from '../components/VueFauna/Auth/Register.vue'
import WorkspaceDashboard from '../components/VueFauna/Workspace/Dashboard.vue'
import WorkspaceProject from '../components/VueFauna/Workspace/ProjectView.vue'

import Page404 from '../components/VueFauna/shared/PageNotFound.vue'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        props: true,
        meta: {
            requiresAuth: true,
            transition: 'zoom'
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
        name: 'login',
        component: Login,
        props: true,
        meta: {
            isPublic: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component:Register,
        meta: {
            isPublic: true
        }
    },
    //Workspace
    {
        path: '/workspace/:name',
        name: 'workspace',
        component: WorkspaceDashboard,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/workspace/:name/project/:id',
        name: 'workspace-project',
        component: WorkspaceProject,
        props: true,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '*',
        name: 'Page404',
        component: Page404
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    linkExactActiveClass: "active",
})

export default router