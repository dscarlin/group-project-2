module.exports = (db) => { 
   
    const Op = db.Sequelize.Op;
    //create some example users
    db.User.create(
        {user_name: 'Bob Rothschild', email: 'bob@email.com', text_enabled: true, phone_number: '(839) 394 2994', status: true}
    )
    .then(user => {
        //log data values for each user
        console.log(user.get());
        //get data values for one user by email search for testing
    })
    db.Group.create({name: 'Basketball Bros'})
        .then(newGroup => {
            console.log('################ new Group: ',newGroup.get());
        })
    // const UserGroup = db.sequelize.model('UserGroup');
    db.Group.prototype.getUsers().then(res => console.log(res))

    // UserGroup.findAll().then(res => console.log('*************',res))
    // UserGroup.create({UserId: 1, GroupId: 1}).then(res => console.log(res))
    console.log(Object.keys(db.User.prototype));
    console.log(Object.keys(db.Group.prototype));
}