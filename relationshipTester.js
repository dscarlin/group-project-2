
module.exports = (db)=>{
    //create some example users
    db.User.bulkCreate([
        {user_name: 'Bob Rothschild', email: 'bob@email.com', text_enabled: true, phone_number: '(839) 394 2994', status: true},
        {user_name: 'Tim Collins', email: 'tim@email.com', text_enabled: true, phone_number: '(903) 394 3364', status: true},
        {user_name: 'Jamal Perkins', email: 'jamal@email.com', text_enabled: true, phone_number: '(839) 454 2994', status: true}
    ])
    .then(newUsers => {
        //log data values for each user
        newUsers.forEach(user => console.log('################ new User: ',user.get()));
        //get data values for one user by email search for testing
        db.User.findOne({
            where: {email: 'bob@email.com'}
        }).then(user => {
            //log that user's data values
            console.log('############### should be bob: ',user.get());
            //create a group in group table 
            db.Group.create({group_name: 'Basketball Bros'})
            .then(newGroup => {
                console.log('################ new Group: ',newGroup.get());
                //let's put all three users in the group at once
                //create an array of each user's id and the new group id
                let users = new Array();
                newUsers.forEach(user => 
                    users.push({
                    userId: user.id, 
                    GroupId: newGroup.id 
                }));
                console.log('***** ', users)
                //create a UserGroup entry for each user at once
                db.UserGroup.bulkCreate(users)
                // log each new UserGroup entry from array response
                .then(newUserGroups => newUserGroups.forEach(userGroup => {
                    console.log('######### new UserGroup: ', userGroup.get())
                }));
    
            })
            
        })
    
    })
    .catch(err => console.log('Error while user creation: ', err))
}