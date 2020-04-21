<template>
  <div id="app">
    <Header/>
    <div>
      <router-view></router-view>
    </div>
    <Footer/>
  </div>
</template>
<script>
import Footer from './components/Ortigan/Footer'
import Header from './components/Ortigan/Header'
export default {
  components: {
    Header,
    Footer
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
