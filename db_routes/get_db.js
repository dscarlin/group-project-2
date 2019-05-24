module.exports = (app,db) => {
    const Op = db.Sequelize.Op;

    // login mock api
    app.get('/api/userId', (req, res) => {
    console.log('requested user id')
    res.json({id: 1  });
    });

    //get for group page
    app.get('/api/group/:id/:name', (req, res) => {
    console.log('requested group')
    
    });
  
    //get for groups page
    app.get('/api/groups/:id', (req,res) => {
        console.log('requested user groups')
        
        let id = req.params.id;
        db.UserGroup.findAll({
            where: { UserId: id }, 
            include: {
                model: db.Group,
                attributes: ['name','id'],
                include: {
                    model: db.UserGroup,
                    attributes: ['GroupId'],
                    include: {
                        model: db.User,
                        attributes: ['status','id'],
                        where: {
                            id: {
                                [Op.ne]: id
                            }
                        }
                    }   
                }
            } 
        })
        .then(result => {
            let groupsArray = new Array;
            result.forEach(item => {
                let statusArray = new Array;
                item.Group.UserGroups.forEach(userGroup => {
                    let user = userGroup.User
                    statusArray.push(user.status)
                    console.log('Status:',user.status)
                })
                let group = {
                    name: item.Group.name,
                    id: item.Group.id,
                    memberStatusArray: statusArray
                }
                groupsArray.push(group)
                
            })
            res.json(groupsArray)
        });

    });
}