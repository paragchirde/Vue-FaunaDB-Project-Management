<template>
    <div>
        <div class="w-full bg-gray-300 h-screen">
            <div class="container mx-auto h-full flex justify-center items-center">
                <div class="w-1/3">
                    <h2 class="font-light mb-4 text-center text-gray-600">Register to our website</h2>
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-light mb-2" for="name">
                                Name
                            </label>
                            <input  v-model="name" v-validate="'required|min:3'" data-vv-validate-on="blur" :class="errors.first('name') ? 'border border-red-500' : '' "
                                name="name" class="shadow-sm appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="name" type="text" placeholder="Username">
                            <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('name') }}</span>
                        </div>
                        <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-light mb-2" for="email">
                                Email
                            </label>
                            <input  v-model="email" v-validate="'required|email|min:3'" data-vv-validate-on="blur" :class="errors.first('email') ? 'border border-red-500' : '' "
                                name="email" class="shadow-sm appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                id="username" type="text" placeholder="Email">
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
                            <!-- <button
                                class="bg-blue-500 hover:bg-blue-700 text-white font-light py-2 px-4 rounded"
                                type="button" aria-disabled="true">
                                Sign In
                            </button> -->
                            <b-button :disabled="!validateForm" variant="primary" @click.prevent="createUser()">Register</b-button>
                            <a class="inline-block align-baseline font-light text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                    <p class="text-center text-gray-500 text-xs">
                        &copy;2020 Ortigan. All rights reserved.
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
            name: '',
            email: '',
            password: '',
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
        createUser(){
            client.query(
            q.Create(
                q.Collection('users'), {
                    credentials: {password: this.password},
                    data:{
                        name: this.name,
                        email: this.email
                    }
                }
            )
            )
            .then((ret) => {
                console.log(ret)
                this.showToast('User Added', 'success')
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    computed: {
    validateForm() {
      return !this.errors.any() && this.name != "" && this.email != "" && this.password != "";
    }
  }
}
</script>