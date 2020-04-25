<template>
    <div>
        <div class="w-full bg-gray-300 h-screen">
            <div class="container mx-auto h-full flex justify-center items-center">
                <div class="w-full md:w-1/3">
                    <div class="text-center mb-4">
                        <p class="text-blue font-semibold text-3xl">Project Management | <span class="font-base text-base"> Beta</span> </p>
                    </div>
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-t-4 border-blue">
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
                            <router-link :to="{ name:'project-login' }">
                                    Login
                            </router-link>
                            <vs-button :disabled="!validateForm" variant="primary" @click.prevent="createUser()">Register</vs-button>
                        </div>
                    </form>
                    <p class="flex justify-center">
                        <a href=" https://github.com/parag1997/vue-fauna-test">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z"/></svg>
                        </a>
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
                this.loginUser()
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        loginUser(){
            this.$vs.loading({})
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
                        this.$vs.loading.close()
                        this.$router.push({name:'dashboard'})
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
      return !this.errors.any() && this.name != "" && this.email != "" && this.password != "";
    }
  }
}
</script>