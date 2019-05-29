module.exports = (app,db) => {
    const Op = db.Sequelize.Op;
    //remove user
    app.delete('/api/user/:id', (req, res) => {
        console.log('called delete on user')
        let id = req.params.id
        db.User.destroy({where: { id: id }})
        .then((res => res ? res.status(200) : res.status(400)))
    })

    //remove group
    app.delete('/api/group/:id', (req, res) => {
        console.log('called delete on group')
        let id = req.params.id
        db.Group.destroy({where: { id: id }})
        .then((res => res ? res.status(200) : res.status(400)))
    })

    //remove user from group
    app.delete('/api/user/group/:userId/:groupId', (req, res) => {
        console.log(req.params)
        let UserId = req.params.userId
        let GroupId = req.params.groupId
        db.UserGroup.destroy({where: { UserId: UserId, GroupId: GroupId }})
        .then((result => {
            console.log(result)
            result ? res.status(200).send(true) : res.status(400).send(false)
        }))
    })


}