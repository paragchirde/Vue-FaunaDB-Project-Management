<template>
  <div id="app">
    <div>
    <Header/>
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Footer from './components/VueFauna/Footer'
import Header from './components/VueFauna/Header'

const faunadb = require('faunadb')
const client = new faunadb.Client({secret: process.env.VUE_APP_FAUNA_SECRET})
const q = faunadb.query
export default {
  components: {
    Header,
    Footer
  },
  created(){
    if(localStorage.getItem('token') != null){
      client.query(q.Get(q.Match(q.Index('user_by_token'), localStorage.getItem('token'))))
      .then(res => {
        this.$store.state.user  = res.data
        localStorage.setItem('user', JSON.stringify(res.data))
      })
    }
  }
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
