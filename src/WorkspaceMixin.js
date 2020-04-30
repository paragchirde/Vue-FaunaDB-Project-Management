const faunadb = require('faunadb')

export const WorkspaceMixin = {
    data() {
        return {
            wsClient: '',
            qWs: '',
            allProjects: [],
            project: []
        }
    },
    created() {

    },
    methods: {
        setInstance(data) {
            this.wsClient = new faunadb.Client({ secret: this.DB32(data) })
            this.qWs = faunadb.query
            this.$store.state.currentK = data
        },
        getAllWorkspaceProjects() {
            return new Promise((resolve, reject) => {
                    this.wsClient.query(this.qWs.Paginate(this.qWs.Documents(this.qWs.Collection('projects'))))
                        .then(res => {
                            var x = res.data
                            const data = x.map(ref => {
                                return this.qWs.Get(ref)
                            })
                            this.wsClient.query(data).then(res => {
                                this.allProjects = res
                            })
                        })
                    if (this.allProjects != null) {
                        resolve("success", this.allProjects)
                    } else {
                        reject("Error")
                    }
                })
                // return projects
        },
        //Project by id
        getAllWorkspaceProjectById(id) {
            return new Promise((resolve, reject) => {
                this.wsClient.query(
                        this.qWs.Get(this.qWs.Ref(this.qWs.Collection('projects'), id)))
                    .then(res => {
                        this.project = res
                        resolve(res)
                    })
                    .catch(err => {
                        console.log("[MIXIN ERROR]", err)
                        reject(err)
                    })
            })
        },

    }
}