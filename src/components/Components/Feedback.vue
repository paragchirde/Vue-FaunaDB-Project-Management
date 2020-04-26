<template>
    <div class="text-base font-normal bg-gray-100 p-4">
        <div class="flex justify-between">
            <div class="hidden md:block">        
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 22v-16h16v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-10.386h-20v20h10.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-5v-1h5v1zm5-4h-10v1h10v-1zm0-3h-10v1h10v-1zm2-7h-19v19h-2v-21h21v2z"/></svg>
                Feedback/Requirements
            </div>
            <div>
                <vs-button @click="popupActivoFeedback=true" color="primary" type="filled" class="w-full">Add New Issue</vs-button>
                <vs-popup class="holamundo"  title="Add a new issue" :active.sync="popupActivoFeedback">
                <div>
                    <div class="flex flex-wrap">
                        <div class="w-full">
                            <label for="issue-title" class="font-light text-base mb-2 text-gray-700">Ttile</label>
                            <input v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('title') ? 'border border-red-500' : '' "
                            name="title"
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="" type="text" placeholder="Enter the issue" v-model="feedbackTitle">
                                <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('title') }}</span>
                        </div>  
                        <div class="w-full">
                            <label for="issue-desc" class="font-light text-base mb-2 text-gray-700">Enter the description of Issue</label>
                            <vs-textarea v-model="feedbackDescription" height="300"  v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('issue') ? 'border border-red-500' : '' "
                            name="issue"
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                            <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('issue') }}</span>
                        </div>
                        <div class="w-full">
                            <label for="issue-assign-to" class="font-light text-base mb-2 text-gray-700">Assign To</label>
                            <vs-select
                            class=" w-full bg-gray-200 text-gray-800"
                            v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('name') ? 'border border-red-500' : '' "
                            name="name"
                            v-model="feedbackAssignedTo"
                            icon="arrow_downward"
                            >
                            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in team" />
                            </vs-select>
                            <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('name') }}</span>
                            <!-- <label for="issue-assign-to" class="font-light text-base mb-2 text-gray-700">Assign To</label>
                            <input v-validate="'required'" data-vv-validate-on="blur" :class="errors.first('name') ? 'border border-red-500' : '' "
                            name="name"
                            class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="" type="text" placeholder="Name of the person who will work on the issue" v-model="feedbackAssignedTo">
                            <span class="text-red-500 font-thin text-sm mt-4">{{ errors.first('name') }}</span> -->
                        </div>  
                    </div>
                    <div class="float-right mt-4">
                        <div class="">
                            <vs-button @click.prevent="addFeedback()" color="primary" type="filled">Add New </vs-button>
                        </div>
                    </div> 
                </div>
                </vs-popup>
            </div>
        </div>
        <table class="table-auto w-full mt-4">
            <thead class="bg-blue text-white">
                <tr>
                <th class="px-4 py-2">Title</th>
                <th class="px-4 py-2">Entities</th>
                <th class="px-4 py-2">Time Log</th>
                <th class="px-4 py-2">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white shadow border-0">
                <tr v-for="feedback in  projectFeedbacks" :key="feedback.id">
                <td class="border px-4 py-2">
                    <p class="font-bold">{{ feedback.data.title }}<p>
                    <p class="text-sm">
                        {{ feedback.data.description  }}
                    </p>
                </td>
                <td class="border px-4 py-2 text-xs">
                    <div>Assigned To:  <p class="bg-teal-200 rounded-lg px-2 text-sm text-teal-700 font-base">{{ feedback.data.assignedTo }}</p></div>
                    <div class="mt-1">Assigned By:  <p class="bg-orange-300 rounded-lg px-2 text-sm text-orange-700 font-base">{{ feedback.data.created_by }}</p></div>
                </td>
                <td class="border px-4 py-2 text-xs">
                    <div>Created At:  <p class="bg-yellow-300 rounded-lg px-2 text-sm text-yellow-700 font-base">{{ moment(feedback.data.created_at).format('MMMM Do YYYY,  h:mm:ss a') }}</p></div>
                    <div class="mt-1" v-if="feedback.data.completed == true">Resolved At: <p class="bg-green-200 rounded-lg px-2 text-sm text-green-700 font-base">{{ moment(feedback.data.resolved_at).format('MMMM Do YYYY, h:mm:ss a') }}</p></div>
                </td>
                <td class="border px-4 py-2">
                   <div>
                        <vs-button color="success" type="border" class="mr-2" size="small" v-if="feedback.data.completed == true">
                             Resolved
                        </vs-button>
                        <vs-button color="primary" class="mr-2" size="small" v-else @click.prevent="markFeedbackAsDone(feedback.ref.id, feedback.data.title)">Resolve</vs-button>
                        <vs-button color="warning" size="small" @click.prevent="removeFeedback(feedback.ref.id)">Remove</vs-button>
                    </div>
                </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
var moment = require('moment');
import { appMixin } from '../../mixins.js'
import { userMixin } from '../../userStateMixin.js'

const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.VUE_APP_FAUNA_SECRET})
const q = faunadb.query

export default {
    mixins: [appMixin,userMixin],
    props:['projectId'],
    data(){
        return {
            moment,
            popupActivoFeedback: false,
            feedbackTitle: '',
            feedbackDescription: '',
            feedbackAssignedTo: '',
            user :this.$store.state.user.name,

            feedbackData: {},
            feedbackObj: {},
            projectFeedbacks: [],

            updateText: '',

            team:[
                {text:'Richard',value:"Richard"},
                {text:'Jared',value:"Jared"},
                {text:'Monica',value:"Monica"},
                {text:'Gilfoyle',value:"Gilfoyle"},
                {text:'Dinesh',value:"Dinesh"},
                {text:'Erlich',value:"Erlich"},
                {text:'Self',value:"Self"},
            ],
        }
    },
    created()   {
        this.getAllFeedbacks()
    },
    methods:{
        getAllFeedbacks(){
            client.query(q.Paginate(q.Match(q.Index('feedback_by_project'), this.projectId)))
            .then(res => {
                var x = res.data
                const data = x.map(ref => {
                    return q.Get(ref)
                })
                client.query(data).then(res => {
                    console.log("[All]",res)
                    this.projectFeedbacks = res
                })
            })
            .then(() => {
                this.getFeedbackEvents()
            })
        },
        getFeedbackEvents(){
            //Get Events
            // for(var i=0;i<=this.projectFeedbacks.length;i++){
            //     }
            client.query(
            q.Paginate(q.Events(q.Ref(q.Collection('feedbacks'), '263604011230298635')))
            ).then((ret) => {
                console.log("[EVENTS FEED] ",ret)
                this.events = ret.data
                // this.events.pop()
                this.events.reverse()
            })
            
        },
        addFeedback(){
            this.$vs.loading({})
            this.feedbackData = {
                "projectId": this.projectId,
                "title": this.feedbackTitle,
                "description": this.feedbackDescription,
                "assignedTo": this.feedbackAssignedTo,
                "completed": false,
                "created_at": Date.now(),
                "created_by": this.user
            }
            this.feedbackObj = {
                data: this.feedbackData
            }
            console.log(this.feedbackObj)
            client.query(
            q.Create(
                q.Collection('feedbacks'), this.feedbackObj
            )
            )
            .then((ret) => {
                console.log(ret)
                this.popupActivoFeedback = false,
                this.updateText = `New Issue Added: ${this.feedbackTitle}`
                // this.addEvent(this.updateText, (Date.now()*1000))
                this.getAllFeedbacks()
                this.$vs.loading.close()
                this.showToast('Feedback Added','Successfully added the issue to the project' , 'success')
            })
            .catch(err => {
                console.log(err)
                this.$vs.loading.close()
                this.showToast('Error','Some error occured :(' , 'danger')
            })
        },
        markFeedbackAsDone(id, title){
                client.query(
                    q.Update(
                        q.Ref(q.Collection('feedbacks'), id),
                        {
                            data: {
                                completed: true,
                                resolved_by: this.user,
                                resolved_at: Date.now()
                            }
                        }
                        )
                )
                .then(res => {
                    console.log("[COmpleted:] ", res)
                    this.getAllFeedbacks()
                    this.updateText = `${title} Marked as completed`
                    // this.addEvent(this.updateText, (Date.now()*1000))
                    this.showToast('Feedback Completed','Issue has been marked as completed' , 'success')
                })
                .catch(err => {
                    console.log(err)
                    this.showToast('Error','Some error occured :(' , 'danger')
                })
        },
        removeFeedback(id){
            client.query(
            q.Delete(
                q.Ref(q.Collection('feedbacks'), id)
            )
            )
            .then((ret) => {
                console.log(ret)
                this.getAllFeedbacks()
                this.showToast('Feedback Remocvd','Issue has been removed' , 'warning')
            })
            .catch(err => {
                console.log(err)
                this.showToast('Error','Some error occured :(' , 'danger')
            })
        },
        editFeedback(){

        },
        // addEvent(updateText, date){
        //     client.query(
        //     q.Insert(
        //         q.Ref(q.Collection('projects'), this.projectId),
        //         date,
        //         'update',
        //         {
        //             data: {
        //                 update: updateText,
        //                 at: moment().format('MMMM Do YYYY, h:mm:ss a')
        //             },
        //         },
        //     ),
        //     )
        //     .then((ret) => {
        //         console.log(ret)
        //         console.log('Ok')
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // }
    },
    computed:{
    }
}
</script>