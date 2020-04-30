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
                <router-link to="/">
                <vs-button @click="popupActiveWorkspace=true"
                    class="w-full bg-blue p-2 text-white font-base rounded shadow-md hover:shadow-lg mt-3">Dashboard
                </vs-button>
                </router-link>
                <vs-divider color="primary"></vs-divider>
            <div class="flex flex-col justify-center rounded-md py-2">
                <div class="text-gray-700 mx-auto mb-2">
                    <img :src="`https://avatars.dicebear.com/v2/identicon/${this.$route.params.name}.svg`" class="bg-white h-12 w-12">
                </div>
                <div class="text-gray-700 text-center font-mono text-blue">
                     <p>Welcome to your new workspace</p>
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