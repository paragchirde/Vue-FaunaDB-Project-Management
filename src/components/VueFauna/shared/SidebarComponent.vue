<template>
    <div>
        <div class="flex flex-col bg-blue-light justify-center rounded-md py-2">
                <div class="text-gray-700 mx-auto">
                    <img :src="`https://avatars.dicebear.com/v2/bottts/${this.$store.state.user.email}.svg`" class="h-12 w-12">
                </div>
                <div class="text-gray-700 text-center font-mono text-blue">
                    Hello, {{ currentUser }} 
                </div>
            </div>
                <!-- <p class="font-semibold text-3xl text-gray-700 mb-2 text-center">Start a new project</p> -->
                <vs-button @click="popupActiveWorkspace=true"
                    class="w-full bg-blue p-2 text-white font-base rounded shadow-md hover:shadow-lg mt-3">Create Workspace
                </vs-button>
                <vs-popup class="holamundo"  title="Add a new workspace" :active.sync="popupActiveWorkspace">
                    <div class="flex flex-wrap">
                                <div class="w-full">
                                    <label for="workspace" class="font-light text-base mb-2 text-gray-700">Enter the name of workspace</label>
                                    <input v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('workspace') ? 'border border-red-500' : '' "
                                    name="workspace"
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                    id="inline-full-name" type="text" placeholder="Project Name use Pascal Case (Eg: sampleProject)" v-model="workspaceName">
                                    <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('workspace') }}</span>
                                </div>
                    </div>
                    <div class="flex justify-end mt-4">
                        <vs-button :disabled="!validateForm"
                        class="bg-blue p-2 text-white font-base rounded shadow-lg" @click="createDBCall()">Create Workspace
                        </vs-button>
                    </div>  
                </vs-popup>
                <div class="mt-3 text-blue font-mono font-light text-sm text-center">
                    This is your personal workspace
                </div>
                <vs-divider color="primary"></vs-divider>
            <div class="mt-3 text-blue font-bold text-center">
                <div class="flex justify-center">
                    <p class="mr-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#1f74ff" d="M0 0v24h24v-24h-24zm11 22h-9v-16h9v16zm11 0h-9v-7h9v7zm0-9h-9v-7h9v7z"/></svg></p>
                    <p>Your workspaces</p>
                </div>
                <div v-if="workspaces == null">No Workspaces Found</div>
                <div v-else v-for="w in workspaces" :key="w.id">
                    <!-- <router-link :to="{ path: `/ortigan/workspace/${w.name}`, params: { name: w.name } }"> -->
                        <a :href="`/workspace/${w.name}`"><vs-button class="w-1/2 md:w-full mt-1" type="border" color="primary">{{ w.name }}</vs-button></a>
                    <!-- </router-link> -->
                </div>
            </div>
    </div>
</template>
<script>
import {appMixin} from '../../../mixins.js'
export default {
    mixins: [appMixin],
    props: ['workspaces'],
    data(){
        return {
            popupActiveWorkspace: false,
            workspaceName:''
        }
    },
    methods:{
        createDBCall(){
            this.popupActiveWorkspace=false
            // this.$emit('createWorkspace')
            this.createWorkspace(this.workspaceName)
        }
    },
    computed: {
        currentUser(){
            return this.$store.state.user.name
        },
        validateForm() {
            console.log(this.errors.any())
            return !this.errors.any() && this.workspaceName != "";
        },
    },
}
</script>