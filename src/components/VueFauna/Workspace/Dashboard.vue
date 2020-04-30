<template>
    <div>
        <Header/>
        <div class="flex flex-wrap">
            <div class="w-full md:w-1/5 lg:2/6 bg-gray-200 p-3 h-full md:h-screen overflow-y-scroll">
                <WsSidebar :workspace="workspace" />
            </div>
            <div class="w-full md:w-4/5 lg:4/6 bg-white px-8 py-3">
            <div class="flex justify-between items-center">
                <p class="font-semibold text-2xl text-gray-700 mb-2 text-blue">{{ currentWorkspace }}</p> 
                <div>
                    <vs-button color="primary" class="mr-1"  @click="popupActiveProject=true" >Add New project</vs-button>
                    <!-- <vs-button color="danger"  @click="popupActiveRemoveWorkspace=true" >Remove Workspace</vs-button>      -->
                </div>  
                <vs-popup class="holamundo"  title="Add a new project" :active.sync="popupActiveProject">
                    <div class="">
                        <div>
                            <div class="flex flex-wrap">
                                <div class="w-full">
                                    <label for="project-name" class="font-light text-base mb-2 text-gray-700">Enter the name of project</label>
                                    <input v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('title') ? 'border border-red-500' : '' "
                                    name="title"
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                    id="inline-full-name" type="text" placeholder="Project Name" v-model="projectName">
                                    <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('title') }}</span>
                                </div>
                                <div class="mt-2 w-full">
                                    <label for="client-name" class="font-light text-base mb-2 text-gray-700">Enter the name of Client</label>
                                    <input v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('client') ? 'border border-red-500' : '' "
                                    name="client"
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                    id="inline-client-name" type="text" placeholder="Client Name" v-model="projectClient">
                                    <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('client') }}</span>
                                </div>
                                <div class="mt-2 w-full">
                                    <label for="client-number" class="font-light text-base mb-2 text-gray-700">Enter the contact number of Client</label>
                                    <input v-validate="'required|min:10|max:10'" data-vv-validate-on="blur" :class="errors.first('contact') ? 'border border-red-500' : '' "
                                    name="contact"
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                    id="inline-client-contact" type="number" placeholder="Client Contact" v-model="projectClientContact">
                                    <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('contact') }}</span>
                                </div>
                                <div class="mt-2 w-full">
                                    <label for="client-email" class="font-light text-base mb-2 text-gray-700">Enter the email of Client</label>
                                    <input  v-validate="'required|email'" data-vv-validate-on="blur" :class="errors.first('email') ? 'border border-red-500' : '' "
                                    name="email"
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="inline-client-email" type="email" placeholder="Client Email" v-model="projectClientEmail">
                                    <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('email') }}</span>
                                </div>
                                <div class="mt-2 w-full">
                                    <label for="project-cost" class="font-light text-base mb-2 text-gray-700">Enter the Estimated Cost</label>
                                    <input  v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('cost') ? 'border border-red-500' : '' "
                                    name="cost"
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                    id="inline-cost" type="number" placeholder="Estimated Cost" v-model="projectCost">
                                    <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('cost') }}</span>
                                </div>  
                                <div class="mt-2 w-full">
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
                                <vs-button :disabled="!validateForm"
                                class="bg-blue p-2 text-white font-base rounded shadow-lg" @click="create()">Create Project
                                </vs-button>
                            </div>  
                        </div>
                    </div>
                </vs-popup>
                <vs-popup class="holamundo"  title="Are you sure you want to remove this workspace?" :active.sync="popupActiveRemoveWorkspace">
                    <div class="">
                        <div class="flex flex-wrap">
                            <div class="w-full">
                                <div class="bg-red-200 p-2 text-sm text-red-500 mb-2 rounded-lg">
                                All the projects will be removed from the workspace
                                </div>
                                <div class="flex justify-end">
                                    <vs-button @click="remove()" color="danger">Yes</vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </vs-popup>
            </div>
                <!-- Workspace Projects -->
                <div>        
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                        <div class="" v-for="(project,index) in allProjects" :key="index">
                            <ProjectCard :data="project" class="mt-2" />
                        </div>       
                    </div>
                </div>
            </div>
        </div>
        <!--  -->
    </div>
</template>
<script>
import { WorkspaceMixin } from '../../../WorkspaceMixin.js'
import { appMixin } from '../../../mixins.js'
import { userMixin } from '../../../userStateMixin.js'
import ProjectCard from '../Workspace/ProjectCard'
import WsSidebar from '../shared/WsSidebar'

const faunadb = require('faunadb')

const client = new faunadb.Client({secret: process.env.VUE_APP_FAUNA_SECRET})
const q = faunadb.query

export default {
    mixins: [WorkspaceMixin,appMixin,userMixin],
    props:['name'],
    components: {
        ProjectCard,
        WsSidebar
    },
    data(){
        return{
            workspaceName: this.name,
            keyX: '',
            wsClient:null,
            qWs:null,
            popupActiveProject: false,
            popupActiveRemoveWorkspace: false,
            projectData: {},
            allProjects: [],
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
        }
    },
    created(){

        console.log('CHanged')
        client.query(q.Get(q.Match(q.Index('user_by_email'), this.$store.state.user.email)))
        .then(res => {
            var data = res.data.workspaces
            data.some(w => {
                if(w.name === this.currentWorkspace){
                    this.keyX = w.key
                    this.setInstance(this.keyX)
                }
            })
            this.getAll()
        })
        .catch(() => {
            this.$router.push({name: 'dashboard'})
        })
    
    },
    methods:{
        getAll(){
            this.getAllWorkspaceProjects()
        },
        create(){
            this.popupActiveProject=false,
            this.$vs.loading()
            this.projectData = {
                "name" : this.projectName,
                "client" : this.projectClient,
                "clientContact": this.projectClientContact,
                "clientEmail": this.projectClientEmail,
                "cost" : this.projectCost,
                "type" : this.projectType,
                "status": "Created",
                "totalReceived": 0,
                "update": 'Project Created',
                "created_at": Date.now(),
                "created_by": this.$store.state.user.email
            }
            this.projectObj = {
                data: this.projectData
            }
            this.wsClient.query(
            this.qWs.Create(
                this.qWs.Collection('projects'), this.projectObj
            )
            )
            .then(() => {
                this.getAll()
                this.showToast('Project Created', `${this.projectName} has been successfully created`, 'success')
                this.clearfields()
                this.$vs.loading.close()
            })
            .catch(err => {
                console.log(err)
                 this.loading = false
                 this.$vs.loading.close()
                 this.showToast('Error', 'There is been some error in your action :(', 'danger')
            })
        },
        clearfields(){
            this.projectName = '',
            this.projectClient = '',
            this.projectClientContact = '',
            this.projectClientEmail = '',
            this.projectCost = '',
            this.projectType = ''
        },
    },
    computed: {
        validateForm() {
            console.log(this.errors.any())
            return !this.errors.any() && this.projectName != "" && this.projectClient != "" && this.projectClientContact != "" && this.projectClientEmail != "" && this.projectCost != "" && this.projectType != "";
        },
        currentUser(){
            return this.$store.state.user.name
        },
        currentWorkspace(){
            return this.$route.params.name
        }
    },
}
</script>