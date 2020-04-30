<template>
    <div>
        <div class="w-full bg-white rounded-lg p-2 mt-2 border-l-4 border-blue" v-for="(event, index) in events" :key="index">
            <div class="inline-block">
                <vs-chip color="primary" transparent>
                {{  moment(event.ts/1000).fromNow()  }}
                </vs-chip>
            </div>
            <div class="bg-gray-200 shadow-inner p-2 mt-1 rounded-lg">
                {{ event.data.update }}
            </div>
            <div class="text-xs">
                Timestamp:
                {{ moment(event.ts/1000).format('MMMM Do YYYY, h:mm:ss a') }}
            </div>
        </div>
    </div>
</template>
<script>
var moment = require('moment');
export default {
    props:['events'],
    data(){
        return{
            moment
        }
    }
    
}
</script>