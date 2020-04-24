<template>
    <div>
        <div  class="bg-blue p-2 px-4 text-white text-2xl font-base">
            <div class="flex justify-between">
                <p>Ortigan | <span class="font-base text-base"> Project Management</span> </p>
                <div class="text-base align-middle mt-2" v-if="check">
                    Hello, {{ this.$store.state.user.name }}
                    <vs-button @click="logout()" color="warning" size="small">Logout</vs-button>
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
    methods:{
        logout(){
                client.query(q.Logout(true))
                .then(res => {
                    console.log(res)
                    localStorage.removeItem('token')
                    localStorage.removeItem('userId')
                    localStorage.removeItem('user')
                    this.$router.push({name:'ortigan-project-login'})
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
            }
            return true
        }
    }
        
}
</script>