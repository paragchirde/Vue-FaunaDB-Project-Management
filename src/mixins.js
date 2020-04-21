 export const appMixin = {
     created() {

     },
     methods: {
         showToast(message, type) {
             this.$toast(message, {
                 timeout: 2000,
                 type: type
             });
         }
     }
 }