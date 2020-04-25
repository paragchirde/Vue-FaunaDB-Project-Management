<template>
    <div>
        <div  class="bg-blue p-2 px-4 text-white text-2xl font-base">
            <div class="flex justify-between">
                <p>Project Management | <span class="font-base text-base "> Beta</span> </p>
                <div class="text-base align-middle mt-2" v-if="check">
                    <div class="flex">
                    <img :src="`https://avatars.dicebear.com/v2/bottts/${this.$store.state.user.name}.svg`" class="h-10 w-10 mr-2" /> 
                    <vs-button @click="logout()" color="warning" size="small">Logout</vs-button>
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
    methods:{
        logout(){
                client.query(q.Logout(true))
                .then(res => {
                    console.log(res)
                    localStorage.removeItem('token')
                    localStorage.removeItem('userId')
                    localStorage.removeItem('user')
                    this.$router.push({name:'project-login'})
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