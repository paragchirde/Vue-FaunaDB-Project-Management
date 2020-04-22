<template>
    <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div class="" v-for="(payment, index) in paymentData" :key="index">
                <div class="bg-gray-100 p-2 text-gray-700 shadow-md mt-4">
                    <div class="flex justify-between">
                        <div>
                            <vs-chip color="primary">
                                {{ moment(payment.ts/1000).format('MMMM Do YYYY, h:mm:ss a') }}
                            </vs-chip>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#48bb78" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>
                        </div>
                    </div>
                    <p>Job: {{ payment.data.paymentDescription }}</p>
                    <p>Cost: <span class="bg-green-500 px-1 rounded font-bold shadow-sm text-white">₹{{ payment.data.paymentCost }}</span> </p>
                    <div>Paid By: <span class="font-semibold">{{ payment.data.paymentBy }}</span>  via <span class="font-italic text-indigo-700">{{ payment.data.paymentMethod }}</span></div>
                    <p>Received By: <span class="font-semibold">{{ payment.data.paymentReceivedBy }}</span> </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { appMixin } from '../../mixins.js'
var moment = require('moment');
export default {
    mixins: [appMixin],
    props:['paymentData'],
    data(){
        return{
            moment
        }
    },
    created(){
        console.log(this.paymentData)
    },
    methods:{

    }
}
</script>