var base32 = require('hi-base32')
const faunadb = require('faunadb')
const client = new faunadb.Client({ secret: process.env.VUE_APP_FAUNA_SECRET })
const q = faunadb.query
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
        },
        EB32(text) {
            const data = base32.encode(text)
            return data
        },
        DB32(text) {
            const data = base32.decode(text)
            return data
        },
        createWorkspace(Wsname) {
            console.log(Wsname)
            var teamName = ''
            var key = ''
            this.$vs.loading()
            client.query(q.CreateDatabase({ name: Wsname }))
                .then(res => {
                    console.log('[DATABASE CREATED]', res)
                    teamName = res.name
                        //Create Key
                    client.query(q.CreateKey({
                            database: q.Database(res.name),
                            role: 'admin',
                        }))
                        .then(res => {
                            console.log("[KEY CREATED]", res)
                            key = res.secret
                        })
                        .then(() => {
                            client.query(q.Get(q.Match(q.Index('user_by_email'), this.$store.state.user.email)))
                                .then(res => {
                                    console.log(res)
                                })
                            const obj = {
                                "name": teamName,
                                "key": this.EB32(key)
                            }
                            client.query(
                                q.Let({
                                        userRef: q.Select(0, q.Paginate(q.Match(q.Index('user_by_email'), this.$store.state.user.email)), null),
                                        user: q.If(q.IsRef(q.Var('userRef')), q.Get(q.Var('userRef')), q.Abort('No user found')),
                                        currentworkspaces: q.Select(['data', 'workspaces'], q.Var('user'), []),
                                    },
                                    q.Update(q.Var('userRef'), {
                                        data: {
                                            workspaces: q.Distinct(
                                                q.Append(
                                                    [
                                                        obj
                                                    ],
                                                    q.Var('currentworkspaces')
                                                )
                                            ),
                                        },
                                    })
                                )).then(res => {
                                console.log("[USER DATA UPDATED]", res)
                            })
                        })
                        .then(() => {
                            //Create collections
                            const wsClient = new faunadb.Client({ secret: key })
                            const q = faunadb.query
                            wsClient.query(
                                    q.Map(
                                        [
                                            'projects',
                                            'members',
                                        ],
                                        q.Lambda(
                                            'collections_name',
                                            q.CreateCollection({ name: q.Var("collections_name") })
                                        ),
                                    )
                                )
                                .then((ret) => {
                                    console.log("[COLLECTIONS CREATED]", ret)
                                })
                                .then(() => {
                                    //Add user to the members collection
                                    wsClient.query(q.Create(q.Collection('members'), {
                                            data: {
                                                name: this.$store.state.user.name,
                                                email: this.$store.state.user.email,
                                            }
                                        }))
                                        .then((res) => {
                                            console.log("[USER ADDED TO MEMBERS COLLECTION]", res)
                                        })
                                })
                                .then(() => {
                                    wsClient.query(q.CreateIndex({
                                        name: 'project_by_id',
                                        source: q.Collection('projects'),
                                        terms: [{ field: ['data', 'id'] }]
                                    }))
                                    wsClient.query(q.CreateIndex({
                                            name: 'member_by_email',
                                            source: q.Collection('members'),
                                            terms: [{ field: ['data', 'email'] }]
                                        }))
                                        .then((res) => {
                                            console.log("[INDEX CREATED]", res)
                                            this.getWorkspaces()
                                            this.$vs.loading.close()
                                        })
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })

                })
                .catch(() => {
                    this.$vs.loading.close()
                    this.showToast('Oh Snap!', `There was some problem in creating the workspace`, 'warning')
                })
        },
        getWorkspaces() {
            client.query(q.Get(q.Match(q.Index('user_by_email'), this.$store.state.user.email)))
                .then(res => {
                    this.workspaces = res.data.workspaces
                    this.$store.state.workspaces = this.workspaces
                })
        }
    }
}