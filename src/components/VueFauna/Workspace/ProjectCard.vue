<template>
    <div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg border-t-4 border-blue p-4">
            <div class="">
                <p class="text-xs bg-blue text-white inline-block px-1">{{ data.data.type }}</p>
                <div class="flex justify-between">
                    <div class="font-semibold text-base mb-2 text-gray-700">
                        {{ data.data.name }}
                    </div>
                     <vs-chip :color="statusColor" transparent>{{ data.data.status }}</vs-chip>
                </div>
                <div class="flex justify-between">
                    <div class="text-gray-500 text-base">
                        Client: <br>
                        <span class="text-gray-600 text-sm font-light">{{ data.data.client }}</span>
                    </div>
                    <div class="text-gray-700 text-base">
                        <p class="text-gray-500">Cost:<br>
                        <span class="text-gray-600 text-xl font-semibold">₹{{ data.data.cost }}</span></p>
                    </div>

                </div>
            </div>
            <div class="h-1 bg-indigo-100 mt-2"></div>
            <div class="flex justify-between mt-2 items-center">
                <div>
                        <div class="text-xs text-hairline text-gray-600 mt-2 flex align-middle">
                            <!-- <div> <svg class="mt-1 mr-1" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path fill="#718096" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/></svg></div> -->
                            <div>
                                <!-- {{ moment(data.data.created_at).format('MMMM Do YYYY') }} -->
                                <vs-avatar  color="white" :src="`https://avatars.dicebear.com/v2/bottts/1.svg`"/>
                                <vs-avatar  color="white" class="-ml-4" :src="`https://avatars.dicebear.com/v2/bottts/2.svg`"/>
                                <vs-avatar  color="white" class="-ml-4" :src="`https://avatars.dicebear.com/v2/bottts/3.svg`"/>
                                <vs-avatar color="primary" text="+"/>
                            </div>
                        </div>
                </div>
                <router-link :to="{ path:`/workspace/${this.$route.params.name}/project/${data.ref.id}`, params: {name:this.$route.params.name, id: data.ref.id } }">
                    <button class="bg-blue px-2 text-white font-base text-sm rounded-sm shadow-lg align-middle">View</button> 
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>

var moment = require('moment');
export default {
    props:['data'],
    data(){
        return{
            moment:moment,
        }
    },
    computed:{
        statusColor(){
            var color = ''
            if(this.data.data.status == 'Completed'){
                color =  'success'
            } else if(this.data.data.status == 'Ready to Deploy'){
                color = 'warning'
            } else if(this.data.data.status == 'Feedback Mode'){
                color = 'danger'
            } else {
                color = 'primary'
            }
            return color
        }
    }
}
</script>