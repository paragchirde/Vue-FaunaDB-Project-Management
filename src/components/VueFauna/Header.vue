<template>
    <div>
        <div  class="bg-blue p-2 px-4 text-white text-2xl font-base">
            <div class="flex justify-between items-center">
                <router-link to="/"><p>Project Management | <span class="font-base text-base "> Beta </span> </p></router-link>
                <div class="text-base align-middle mt-2" v-if="check">
                   <div class="flex">
                        <vs-button @click="logout()" color="white" size="small" type="border">Logout</vs-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.VUE_APP_FAUNA_SECRET})
const q = faunadb.query
export default {
    created(){
        this.check
    },
    methods:{
        logout(){
                    localStorage.removeItem('token')
                    localStorage.removeItem('userId')
                    localStorage.removeItem('user')
                client.query(q.Logout(true))
                .then(res => {
                    console.log(res)
                    this.$router.push({name:'login'})
                })
                .catch(err => {
                    console.log(err)
                })
            },
    },
    computed:{
        check(){
            if(localStorage.getItem('token') != null){
                return true
            } else {
                return false
            }
        }
    }
        
}
</script>