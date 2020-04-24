<template>
    <div>
        <div class="w-full bg-gray-300 h-screen">
            <div class="container mx-auto h-full flex justify-center items-center">
                <div class="w-full md:w-1/3">
                    <div class="text-center mb-4">
                        <p class="text-blue font-semibold text-3xl">Ortigan | <span class="font-base text-base"> Project Management</span> </p>
                    </div>
                    <!-- <h2 class="font-light mb-4 text-center text-gray-600">Login to our website</h2> -->
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-t-4 border-blue">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-light mb-2" for="email">
                                Email
                            </label>
                            <input  v-model="email" v-validate="'required|email|min:3'" data-vv-validate-on="blur" :class="errors.first('email') ? 'border border-red-500' : '' "
                                name="email" class="shadow-sm appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="username" type="text" placeholder="Enter your email">
                            <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('email') }}</span>
                        </div>
                        <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-light mb-2" for="password">
                                Password
                            </label>
                            <input v-model="password" data-vv-validate-on="blur" v-validate="'required|min:6|max:10'"
                                :class="errors.first('password') ? 'border border-red-500' : '' " name="password"
                                class="shadow-sm appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight" id="password"
                                type="password" placeholder="******************">
                            <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('password') }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <p>
                                <router-link :to="{ name:'ortigan-project-register' }">
                                    Register
                                </router-link>
                            </p>
                            <vs-button :disabled="!validateForm" variant="primary" @click.prevent="loginUser()">Login</vs-button>
                        </div>
                    </form>
                    <p class="text-center text-gray-600 text-sm">
                        &copy;2020 Ortigan. All rights reserved.
                    </p>
                    <p>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { appMixin } from '../../../mixins.js'
 
const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.VUE_APP_FAUNA_SECRET})
const q = faunadb.query
export default {
    mixins: [appMixin],
    data(){
        return {
            email: '',
            password: '',
            token: ''
        }
    },
    methods: {
        onSubmit() {
        this.$validator.validateAll().then(result => {
            if (!result) {
            return;
            }
            alert("Form submitted!");
        });
        },
        loginUser(){
            client.query(
                q.Login(
                    q.Match(q.Index("user_by_email"), this.email),
                    { password: this.password }
                )
            )
            .then(res => {
                this.token = res.secret
                if(this.token!=null){
                    localStorage.setItem('token', this.token)
                    client.query(q.Get(q.Ref(q.Collection('users'), res.instance.value.id)))
                    .then(res => {
                        localStorage.setItem('user', JSON.stringify(res.data))
                        this.$store.state.user = res.data
                        this.showToast('Success', '', 'success')
                        this.$router.push({name:'ortigan-dashboard'})
                    })
                } else {
                    console.log("Error")
                }   
            })
            .catch(err => {
                console.log(err)
                
            })
        }
    },
    computed: {
    validateForm() {
      return !this.errors.any() && this.email != "" && this.password != "";
    }
  }
}
</script>