
module.exports = (db) => { 
    const Op = db.Sequelize.Op;
    //create some example users
    db.Users.bulkCreate([
        {user_name: 'Bob Rothschild', email: 'bob@email.com', text_enabled: true, phone_number: '(839) 394 2994'},
        {user_name: 'Tim Collins', email: 'tim@email.com', text_enabled: true, phone_number: '(903) 394 3364'},
        {user_name: 'Jamal Perkins', email: 'jamal@email.com', text_enabled: true, phone_number: '(839) 454 2994'}
    ])
    .then(newUsers => {
        //log data values for each user
        newUsers.forEach(user => console.log('################ new User: ',user.get()));
        //get data values for one user by email search for testing
        
        db.Groups.create({name: 'Basketball Bros'})
        .then(newGroup => {
            console.log('################ new Group: ',newGroup.get());
            //let's put all three users in the group at once
            //create an array of each user's id and the new group id
            let users = new Array();
            newUsers.forEach(user => 
                users.push({
                userId: user.id, 
                groupId: newGroup.id 
            }));
            console.log('***** ', users)
            //create a UserGroup entry for each user at once
            db.UserGroups.bulkCreate(users)
            // log each new UserGroup entry from array response
            .then(newUserGroups => {
                newUserGroups.forEach(userGroup => {
                console.log('######### new UserGroup: ', userGroup.get())
                })

                //-----------------Start example queries with seed data ---------//
                //????? Get the Id and Name of each group, and an array of all member statuses ¿¿¿¿¿¿///

                //get the id of all groups user is a member of
            db.Users.findAll({include:[db.UserGroups]}).then(res => {
                res.forEach(item => console.log(item.get()))

            })
            db.Users.findAll().then(res => {
                res.forEach(item => console.log(item.get()))
                db.Groups.findAll().then(res => {
                    res.forEach(item => console.log(item.get()))
                    db.UserGroups.findAll().then(res => {
                        res.forEach(item => console.log(item.get()))
                    })
                })
            }) 

            });
        
            
        });
    
    });
  
};
