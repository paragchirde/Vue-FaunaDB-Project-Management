<template>
    <div>
        <div class="flex flex-wrap">
            <div class="w-full md:w-1/3 bg-gray-100 p-8">
            <!-- <router-link :to="{ name:'ortigan-project-login' }">
                <button class="bg-indigo-500 p-2 text-center text-white font-light rounded shadow-lg">Login
                    <b-spinner label="Loading..." small v-if="loading==true"></b-spinner>
                </button>
            </router-link>
            <router-link :to="{ name:'ortigan-project-register' }">
                <button class="bg-orange-500 p-2 text-center text-white font-light rounded shadow-lg">Register
                    <b-spinner label="Loading..." small v-if="loading==true"></b-spinner>
                </button>
            </router-link>
            <button @click="logout()" class="bg-orange-500 p-2 text-center text-white font-light rounded shadow-lg">Logout</button> -->
                <p class="font-semibold text-3xl text-gray-700 mb-2 text-center">Start a new project</p>
                <div class="bg-white h-auto w-auto mt-6 rounded-sm p-8 shadow border-t-4 border-indigo-500">
                    <div>
                        <div class="flex flex-wrap">
                            <div>
                                <label for="project-name" class="font-light text-base mb-2 text-gray-700">Enter the name of project</label>
                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Project Name" v-model="projectName">
                            </div>
                            <div class="mt-4">
                                <label for="client-name" class="font-light text-base mb-2 text-gray-700">Enter the name of Client</label>
                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Client Name" v-model="projectClient">
                            </div>
                            <div class="mt-4">
                                <label for="client-number" class="font-light text-base mb-2 text-gray-700">Enter the contact number of Client</label>
                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number" placeholder="Client Contact" v-model="projectClientContact">
                            </div>
                            <div class="mt-4">
                                <label for="client-email" class="font-light text-base mb-2 text-gray-700">Enter the email of Client</label>
                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Client Email" v-model="projectClientEmail">
                            </div>
                            <div class="mt-4">
                                <label for="project-cost" class="font-light text-base mb-2 text-gray-700">Enter the Estimated Cost</label>
                                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="number" placeholder="Estimated Cost" v-model="projectCost">
                            </div>  
                            <div class="mt-4 w-full">
                                <label for="project-cost" class="font-light text-base mb-2 text-gray-700">Select the project type</label>
                                <div class="relative w-full">
                                    <select v-model="projectType" class="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                        <option disabled value="">Please select one</option>
                                        <option v-for="(type, index) in projectTypes" :key="index">{{ type }}</option>
                                    </select>
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                    </div>
                                </div>
                            </div>                    
                        </div>
                        <div class="flex justify-end mt-4">
                            <button class="bg-indigo-500 p-2 text-white font-light rounded shadow-lg" @click="create()">Create Project
                                <b-spinner label="Loading..." small v-if="loading==true"></b-spinner>
                            </button>
                        </div>  
                    </div>
                </div>
            </div>
            <div class="w-full md:w-2/3 bg-white p-8">
                <p class="font-semibold text-3xl text-gray-700 mb-2">List of projects</p>
                <div>
                        <!-- <div class="flex flex-wrap">
                            <div class="h-auto p-4 mt-2 w-full md:w-1/3" v-for="(project,index) in allProjects" :key="index">
                                <ProjectCard :data="project" />
                            </div>                        
                        </div> -->
                    <div class="w-full bg-orange-300 p-2 text-orange-600 rounded-lg" v-if="allProjects.length == 0">
                        No Data Found
                    </div>
                    <b-container class="bv-example-row" v-else>
                        <b-row v-masonry item-selector=".item">
                            <b-col cols="12" md="4" class="item" v-masonry-tile v-for="(project,index) in allProjects" :key="index">
                                <ProjectCard :data="project" class="mt-6" />
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { appMixin } from '../../mixins.js'
var moment = require('moment');
import ProjectCard from '../Ortigan/ProjectCard'
 
const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.VUE_APP_FAUNA_SECRET})
const q = faunadb.query
export default {
     mixins: [appMixin],
     components:{
         ProjectCard
     },
     props:['userId'],
    data(){
        return{
            moment: moment,
            projectName: '',
            projectClient: '',
            projectClientEmail: '',
            projectClientContact: '',
            projectCost: '',
            projectType: '',

            projectTypes: {
                1: 'Static',
                2: 'Dynamic'
            },
            loading: false,
            projects: [],
            allProjects: [],
            projectData: {},
            projectObj: {
            }

        }
    },
    created(){
        console.log(this.userId)
        client.query(
        q.Get(q.Ref(q.Collection('users'), this.userId))
        )
        .then(res => {
            console.log(res)
        })
        this.getAll()

    },
    methods:{
        getAll(){
            client.query(q.Paginate(q.Match(q.Index('all_projects'))))
            .then(res => {
                var x = res.data
                const data = x.map(ref => {
                    return q.Get(ref)
                })
                client.query(data).then(res => {
                    this.allProjects = res
                })
            })
        },
         faunaGetByProjectName(){
                client.query(q.Get(q.Match(q.Index('project_by_name'), 'Demo')))
                .then(res => {
                    this.allProjects = res.data
                })
                . catch(err => {
                    console.log(err.name)
                    this.ipStatus = 'not exists'
                })
        },
        create(){
            this.loading = true
            this.projectData = {
                "name" : this.projectName,
                "client" : this.projectClient,
                "clientContact": this.projectClientContact,
                "clientEmail": this.projectClientEmail,
                "cost" : this.projectCost,
                "type" : this.projectType,
                "status": "Created",
                "totalReceived": 0,
                "update": 'Project Created'
            }
            this.projectObj = {
                data: this.projectData
            }
            console.log(this.projectObj)
            client.query(
            q.Create(
                q.Collection('projects'), this.projectObj
            )
            )
            .then((ret) => {
                console.log(ret)
                this.loading = false
                this.showToast('Project Added', 'success')
                this.projects.push(ret.data)
                this.getAll()
            })
            .catch(err => {
                console.log(err)
                 this.loading = false
            })
        },
        logout(){
            client.query(q.Logout(true))
            .then(res => {
                console.log(res)
                localStorage.removeItem('token')
                this.$router.push({name:'ortigan-project-login'})
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
}
</script>
