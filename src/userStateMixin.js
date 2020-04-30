export const userMixin = {
    data() {
        return {
            workspaces: []
        }
    },
    created() {
        const user = JSON.parse(localStorage.getItem('user'))
        this.$store.state.user = user
    },
    methods: {

    }
}