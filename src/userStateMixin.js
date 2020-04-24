export const userMixin = {
    created() {
        const user = JSON.parse(localStorage.getItem('user'))
        this.$store.state.user = user
        console.log(user)
    },
    methods: {

    }
}