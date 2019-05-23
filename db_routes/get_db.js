module.exports = (app,db) => {
    const Op = db.Sequelize.Op;

    // login mock api
    app.get('/api/userId', (req, res) => {
    console.log('requested user id')
    res.json({id: 1  });
    });
  
    //get for groups page
    app.get('/api/groups/:id', (req,res) => {
        console.log('requested user groups')
        res.json({id: 1})
        let id = req.params.id;
        db.UserGroups
        .findAll({where: {userId: id }, attributes: [], include: [{model: db.Groups}] })
        .then(response => {
            let groupIdArray = new Array(), groupNameAndIdArray = new Array();
            response.forEach(item => {
                let name = item.get().Group.get().name
                let id = item.get().Group.get().id
                groupIdArray.push({groupId: id})
                groupNameAndIdArray.push({id, name, memberStatusArray: []});
            })
            console.log(groupNameAndIdArray)
            db.UserGroups.findAll({
                where: { [Op.and]: groupIdArray }, 
                attributes: ['groupId'], 
                include: [{model: db.Users, attributes: ['status'] }] 
            })
            .then(response => {
                response.forEach(group => {
                    for(let i=0; i < groupNameAndIdArray.length; i++){
                        if (group.get().groupId == groupNameAndIdArray[i].id)

                            return groupNameAndIdArray[i].memberStatusArray.push(group.get().User.get().status)
                    }
                })
                console.log(groupNameAndIdArray)
                // res.json(groupNameAndIdArray)
            });
        });
    });
}