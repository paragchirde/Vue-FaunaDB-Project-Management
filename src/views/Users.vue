<template>
  <div class="users bg-gray-300 h-auto pb-20">
    <div>
      <div class="flex flex-wrap mx-10 md:mx-24">
          <div class="w-full md:w-1/4" v-for="user in allUsers" :key="user.id">
                  <div class="bg-white max-w-sm md:mx-4 rounded-lg overflow-hidden shadow-lg mt-4">
                      <div class="px-3 py-2">
                        <div class="flex justify-between">
                          <div class="text-xl font-bold mb-2 head-font mt-2">
                            {{ user.data.name }}
                          </div>
                          <div>
                            <!-- <img :src="`https://robohash.org/${user.data.email}`" class="h-12 w-12" />  -->
                            <img :src="`https://avatars.dicebear.com/v2/bottts/${user.data.email}.svg`" class="h-12 w-12" /> 
                          </div>
                        </div>
                          <p class="text-gray-700 text-base head-font">
                          {{ user.data.email }}
                          </p>
                          <p class="text-sm">{{ moment(user.ts/1000).fromNow() }}</p>
                      </div>
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

var moment = require('moment');
export default {
    data(){
      return {
        moment,
        allUsers: []
      }
    },
    created(){
      this.getAll()
    },
    methods:{
      getAll(){
            client.query(q.Paginate(q.Match(q.Index('all_users'))))
            .then(res => {
                var x = res.data
                const data = x.map(ref => {
                    return q.Get(ref)
                })
                client.query(data).then(res => {
                    this.allUsers = res
                    console.log(res)
                })
            })
        },
    }
}
</script>