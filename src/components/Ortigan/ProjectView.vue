<template>
    <div>
        <div v-if="loading">Loading Data....</div>
        <div v-else class="flex flex-wrap">
            <div class="w-full md:w-3/4 p-12">
                <div class="flex justify-between">
                    <div>   
                        <router-link :to="{ name:'ortigan-dashboard' }">
                            <vs-button
                            class="border-none bg-indigo-500 px-2 text-white font-semibol text-base rounded-sm align-middle shadow-md hover:bg-indigo-600 hover:shadow-none"
                            >Dashboard</vs-button>
                        </router-link>
                        <div class="font-semibold text-4xl text-gray-700 mb-2">{{ project.data.name }} |  <p class="text-sm font-thin bg-blue-200 text-blue-600 inline-block px-1">{{ project.data.type }}</p></div>
                        <vs-chip color="primary">
                            Creared At: {{ moment(project.ts/1000).format('MMMM Do YYYY') }}
                        </vs-chip>
                        <div>
                            <vs-button @click="remove()" color="danger" size="small">Delete</vs-button>
                        </div>
                    </div> 
                    <div class="">
                        <vs-button @click="popupActivo=true" color="primary" type="border" class="w-full">Add New Payment</vs-button>
                        <vs-popup class="holamundo"  title="Add a new payment for your project" :active.sync="popupActivo">
                        <div>
                            <div class="flex flex-wrap">
                                <div class="w-full">
                                    <label for="project-desc" class="font-light text-base mb-2 text-gray-700">Enter the description of payment</label>
                                    <input v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('email') ? 'border border-red-500' : '' "
                                    name="paymentDesc"
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name"
                                    type="text" placeholder="Purpose of payment" v-model="paymentDesc">
                                    <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('paymentDesc') }}</span>
                                </div>
                                <div class="w-full">
                                    <label for="project-cost" class="font-light text-base mb-2 text-gray-700">Enter the cost of job</label>
                                    <input v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('email') ? 'border border-red-500' : '' "
                                    name="paymentCost"
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    id="" type="number" placeholder="Job Cost" v-model="paymentCost">
                                     <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('paymentCost') }}</span>
                                </div>
                                <div class="w-full">
                                    <label for="project-payment-done-by" class="font-light text-base mb-2 text-gray-700">Payment Done By</label>
                                    <input v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('email') ? 'border border-red-500' : '' "
                                    name="paymentBy"
                                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                    id="" type="text" placeholder="Payment By" v-model="paymentBy">
                                    <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('paymentBy') }}</span>
                                </div>
                                <div class="w-full">
                                    <label for="project-cost" class="font-light text-base mb-2 text-gray-700">Select the payment method</label>
                                    <div class="relative w-full">
                                        <select v-model="paymentMethod" class="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            <option disabled value="">Please select one</option>
                                            <option v-for="(type, index) in paymentMethods" :key="index">{{ type }}</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-full">
                                    <label for="project-received-by" class="font-light text-base mb-2 text-gray-700">Payment Received By</label>
                                    <input v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('email') ? 'border border-red-500' : '' "
                                    name="paymentReceivedBy"
                                     class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                                     id="" type="text" placeholder="Received By" v-model="paymentReceivedBy">
                                     <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('paymentReceivedBy') }}</span>
                                </div>
                            </div>
                            <div class="float-right mt-4">
                                <div class="">
                                    <!-- <button @click="addPayment()" class="border-none bg-indigo-500 p-2 text-white font-thin text-lg rounded-sm align-middle shadow-lg hover:bg-indigo-600 hover:shadow-none">
                                        Add New <b-spinner label="Loading..." small v-if="loading2==true"></b-spinner>
                                    </button> -->
                                    <vs-button @click="addPayment()" color="primary" type="filled">Add New <b-spinner label="Loading..." small v-if="loading2==true"></b-spinner></vs-button>
                                </div>
                            </div> 

                        </div>
                        </vs-popup>
                        
                        <!--  -->
                        <div class="mt-2 font-light items-end">
                            <div class="flex justify-between">
                                <p>Status</p>
                                <p>
                                    <vs-chip :color="statusColor" transparent>{{ project.data.status }}</vs-chip>
                                </p>
                            </div>
                            <vs-select
                            class="selectExample"
                            v-model="selectedStatus"
                            @change="updateStatus()"
                             icon="arrow_downward"
                            >
                            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in paymentMethods1" />
                            </vs-select>
                        </div>
                    </div> 
                </div>
                <div class="mt-4">
                    <div class="flex flex-wrap">
                        <div class="w-full md:w-1/2 px-4 pt-2 mt-2">
                            <p class="text-gray-700 text-2xl font-bold mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.081 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h10.483l.704-3h1.615l.704 3h10.483l.005-1.241c.001-2.52-.198-3.975-3.177-4.663zm-8.231 1.904h-1.164l-.91-2h2.994l-.92 2z"/></svg>
                                Client Details
                            </p>
                            <p class="text-gray-700 text-base font-light">{{ project.data.client }} | {{ project.data.clientEmail }} </p>
                            <p class="text-gray-700 text-base font-light">{{ project.data.clientContact }}</p>
                        </div>
                        <!-- Total -->
                        <div class="w-full md:w-1/2 flex flex-wrap shadow-md mt-2 text-center m-auto">
                            <div class="w-1/3 bg-white p-2 border-l-4 border-blue">
                                    <p class="font-base text-base text-gray-500 mb-2">Estimated</p>
                                <p class="font-bold text-xl text-blue mb-2">₹{{ project.data.cost }}</p>
                            </div>
                            <div class="w-1/3 bg-white p-2 border-l-4 border-green-400">
                                    <p class="font-base text-base text-gray-500 mb-2">Received</p>
                                <p class="font-bold text-xl text-green-500 mb-2">₹{{ project.data.totalReceived }}</p>
                            </div>
                            <div class="w-1/3 bg-white border-l-4 border-orange-400 p-2">
                                    <p class="font-base text-base text-gray-500 mb-2">Pending</p>
                                <p class="font-bold text-xl text-orange-500 mb-2">₹{{ PendingAmount }}</p>
                            </div>
                        </div>  
                    </div>  
                </div>
                <!-- Payments -->
                <div class="h-1 bg-gray-200 mt-4"></div>
                 <div class="h-auto w-full mt-4">
                     <p class="text-gray-700 text-2xl font-bold mb-2 mx-3">
                         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M20 11.999c1.654 0 3 1.347 3 3.001s-1.346 3-3 3-3-1.346-3-3 1.346-3.001 3-3.001zm0-1c-2.209 0-4 1.792-4 4.001s1.791 4 4 4 4-1.791 4-4-1.791-4.001-4-4.001zm.167 5.65v.351h-.334v-.333c-.344-.006-.702-.088-1-.242l.152-.548c.319.124.743.255 1.074.18.383-.086.462-.48.039-.67-.311-.145-1.26-.269-1.26-1.081 0-.455.346-.861.994-.95v-.356h.334v.339c.24.006.512.049.814.141l-.121.548c-.256-.089-.539-.171-.814-.153-.496.029-.541.459-.193.639.569.268 1.314.467 1.314 1.181.001.572-.446.877-.999.954zm-10.344-6.234c-.417-.216-.363-.731.232-.767.33-.021.67.078.977.186l.146-.659c-.363-.11-.688-.16-.978-.168v-.407h-.4v.427c-.778.107-1.193.594-1.193 1.14 0 .975 1.139 1.125 1.512 1.297.508.229.413.701-.047.805-.397.09-.906-.067-1.289-.216l-.183.657c.357.185.787.283 1.2.291v.399h.4v-.421c.663-.093 1.2-.459 1.2-1.147 0-.856-.893-1.096-1.577-1.417zm4.927 4.585c0-2.896 2.355-5.251 5.25-5.251v-4.749h-20v12h15.15c-.255-.617-.4-1.292-.4-2zm-4.75 0c-2.209 0-4-1.791-4-4s1.791-4.001 4-4.001 4 1.792 4 4.001-1.791 4-4 4z"/></svg>
                         Payment Details
                    </p>
                     <PaymentCard :paymentData="projectPayments"/>
                 </div>
            </div>
            <div class="w-full md:w-1/4 bg-gray-300 h-screen p-4 text-sm overflow-y-auto">
                <span class="text-gray-600 font-semibold text-xl">Activiy</span>
                <div class="text-orange-500 text-base" v-if="events==null">Loading Data</div>
                <div v-else>
                    <Events  :events="events"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Events from '../Ortigan/Events'
import { appMixin } from '../../mixins.js'
import PaymentCard from '../Ortigan/PaymentCard'
var moment = require('moment');

// Fauna setup
const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.VUE_APP_FAUNA_SECRET})
const q = faunadb.query

export default {
    mixins: [appMixin],
    props:['id'],
    components:{
        PaymentCard,
        Events
    },
    data(){
        return{
            moment: moment,
            project: [],
            events: [],
            projectPayments: [],
            totalReceived: '',
            selectedStatus: '',
            loading: false,
            loading2: false,
            popupActivo:false,

            paymentMethods: {
                1: 'Cash',
                2: 'Google Pay/UIP',
                3: 'Netbanking'
            },
            paymentMethods1:[
                {text:'Working',value:"Working"},
                {text:'Feedback Mode',value:"Feedback Mode"},
                {text:'Ready to Deploy',value:"Ready to Deploy"},
                {text:'Completed',value:"Completed"},
            ],

            paymentData: {},
            paymentObj: {},

            paymentDesc: '',
            paymentCost: '',
            paymentBy: '',
            paymentMethod: '',
            paymentReceivedBy: ''
        }
    },
    created(){
        this.faunaGetByProjectId()
    },
    methods:{
        async faunaGetByProjectId(){
            this.loading = true
                await client.query(
                q.Get(q.Ref(q.Collection('projects'), this.id))
                )
                .then(res => {
                    this.loading = false
                    this.project = res
                    this.totalReceived = res.data.totalReceived
                    this.selectedStatus = res.data.status
                })
                .then(() => {
                    //Get Events
                    client.query(
                    q.Paginate(q.Events(q.Ref(q.Collection('projects'), this.project.ref.id)))
                    ).then((ret) => {
                        // console.log("[EVENTS] ",ret)
                        this.events = ret.data
                        // this.events.pop()
                        this.events.reverse()
                    })
                    // 
                    client.query(q.Paginate(q.Match(q.Index('payment_by_project'), this.project.ref.id)))
                    .then(res => {
                        var x = res.data
                        const data = x.map(ref => {
                            return q.Get(ref)
                        })
                        client.query(data).then(res => {
                            this.projectPayments = res
                        })
                    })
                })
        },
        addEvent(){
                client.query(
                q.Insert(
                    q.Ref(q.Collection('projects'), this.project.ref.id),
                    Date.now(),
                    'create',
                    {
                        data: {
                            update: `${this.paymentBy} made a payment of ₹${this.paymentCost} via ${this.paymentMethod}`,
                            at: moment().format('MMMM Do YYYY, h:mm:ss a')
                        },
                    },
                ),
                )
                .then((ret) => {
                    console.log(ret)
                    console.log('Ok')
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addPayment(){
            this.loading2 = true
            this.paymentData = {
                "projectId": this.project.ref.id,
                "paymentDescription": this.paymentDesc,
                "paymentCost": this.paymentCost,
                "paymentBy": this.paymentBy,
                "paymentMethod": this.paymentMethod,
                "paymentReceivedBy": this.paymentReceivedBy,
                "at": moment().format('MMMM Do YYYY, h:mm:ss a')
            }
            this.paymentObj = {
                data: this.paymentData
            }
            console.log(this.paymentObj)
            client.query(
            q.Create(
                q.Collection('payments'), this.paymentObj
            )
            )
            .then((ret) => {
                console.log(ret)
                this.popupActivo=false,
                this.showToast('Payment Added', 'success')
            })
            .then(() => {
                this.updateTotal()
            })
            .then(() => {
                this.faunaGetByProjectId()
                this.loading2 = false
            })
            .catch(err => {
                console.log(err)
                 this.loading2 = false
                 this.showToast('Error', 'danger')
            })
        },
        updateTotal(){
            var changedCost = parseInt(this.totalReceived, 10) + parseInt(this.paymentCost, 10)
            client.query(
                q.Update(
                    q.Ref(q.Collection('projects'), this.project.ref.id),
                    {
                        data: {
                            totalReceived: changedCost,
                            update: `${this.paymentBy} made a payment of ₹${this.paymentCost} via ${this.paymentMethod}`,
                        }
                    }
                    )
            )
            .then(res => {
                console.log("[UPDATE TOTAL:] ", res)
            })
        },
        updateStatus(){
            client.query(
                q.Update(
                    q.Ref(q.Collection('projects'), this.project.ref.id),
                    {
                        data: {
                            status: this.selectedStatus,
                            updateStatus: 'statusUpdate',
                            update: `Status changed to ${this.selectedStatus}`,
                        }
                    }
                    )
            )
            .then(res => {
                console.log("[UPDATE Status:] ", res)
                this.faunaGetByProjectId()
            })
        },
        remove(){
            client.query(
            q.Delete(
                q.Ref(q.Collection('projects'), this.id)
            )
            )
            .then((ret) => {
                console.log(ret)
                this.$router.push({name:'ortigan-dashboard'})
            })
        },
        clearFields(){
            this.paymentDesc= '',
            this.paymentCost='',
            this.paymentMethod='',
            this.paymentBy='',
            this.paymentReceivedBy=''
        }
    },
    computed:{
        PendingAmount(){
            if(this.project.data.totalReceived == 0){
                return 0
            } else {
                return this.project.data.cost - this.project.data.totalReceived
            }
        },
        statusColor(){
            var color = ''
            if(this.project.data.status == 'Completed'){
                color =  'success'
            } else if(this.project.data.status == 'Ready to Deploy'){
                color = 'warning'
            } else if(this.project.data.status == 'Feedback Mode'){
                color = 'danger'
            } else {
                color = 'primary'
            }
            return color
        }
    }
}
</script>