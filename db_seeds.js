
module.exports = (db) => { 
    const Op = db.Sequelize.Op;
    //create some example users
    db.User.bulkCreate([
        {user_name: 'Bob Rothschild', email: 'bob@email.com', text_enabled: true, phone_number: '(839) 394 2994', status: true},
        {user_name: 'Tim Collins', email: 'tim@email.com', text_enabled: true, phone_number: '(903) 394 3364', status: false},
        {user_name: 'Jamal Perkins', email: 'jamal@email.com', text_enabled: true, phone_number: '(839) 454 2994', status: true}
    ])
    .then(newUsers => {
        //log data values for each user
        newUsers.forEach(user => console.log('################ new User: ',user.get()));
        //get data values for one user by email search for testing
        
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
            .then(newUserGroups => {
                newUserGroups.forEach(userGroup => {
                console.log('######### new UserGroup: ', userGroup.get())
                })

                //-----------------Start example queries with seed data ---------//
                //????? Get the Id and Name of each group, and an array of all member statuses ¿¿¿¿¿¿///

                //get the id of all groups user is a member of
                
            db.User.findAll().then(res => {
                console.log(res)
                db.Group.findAll().then(res => {
                    console.log(res)
                    db.UserGroup.findAll().then(res => {
                        console.log(res[0].get())
                    })
                })
            }) 

            });
        
            
        });
    
    });
  
};
