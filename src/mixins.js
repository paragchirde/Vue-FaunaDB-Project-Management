 export const appMixin = {
     created() {

     },
     methods: {
         showToast(title, description, type) {
             this.$vs.notify({
                 title: title,
                 text: description,
                 color: type,
                 position: 'top-right'
             })
         }
     }
 }