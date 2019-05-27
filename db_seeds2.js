module.exports = (db) => { 
   
    
   
    const Op = db.Sequelize.Op;
    //create some example users
    let userArray = [
        {user_name: 'Bob Rothschild', email: 'bob@email.com', text_enabled: true, phone_number: '(839) 394-2994', status: 0},
        {user_name: 'Tim Rothschild', email: 'Tim@email.com', text_enabled: false, phone_number: '(839) 394-2994', status: 1},
        {user_name: 'Jane Rothschild', email: 'Jane@email.com', text_enabled: true, phone_number: '(839) 394-2994', status: 0},
        {user_name: 'Timmy Rothschild', email: 'Timmy@email.com', text_enabled: false, phone_number: '(839) 394-2994', status: 1}
    ]
    let groupName = ['Basketball Team','Tennis Group','Friend Group','Church Peeps']
    for (let i=0; i < userArray.length; i++){
        let x = userArray[i]
     
        Promise.all([
            db.User.create(
                {user_name: x.user_name, email: x.email, text_enabled: x.text_enabled, phone_number: '(839) 394 2994', status: x.status}
            ),
        ])
        .then(res => {
            // console.log(res[0].get())
        });
    };

    setTimeout(() => {
        for (let i=0; i < groupName.length; i++){
            db.Group.create({name: groupName[i]}).then(res => {
                // console.log(res)
            })
        };
    }, 300);

    let ids = [[1,1],[1,2],[1,3],[1,4],[2,1],[2,2],[2,3],[2,4]]
    let ids2 = [[3,1],[3,2],[3,3],[3,4],[4,1],[4,2],[4,3],[4,4]]
    

    for (let i=0; i < ids.length; i++){
        setTimeout(function(){
            let x = ids[i];
            db.UserGroup.create({UserId: x[0] , GroupId: x[1]}).then(res => {
                // console.log(res);
                setTimeout(function(){
                let x = ids2[i];
                db.UserGroup.create({UserId: x[0] , GroupId: x[1]}).then(res => {
                    // console.log(res);
                    
                });
                },500)
            });
        },500)
    }
    setTimeout(()=> {
       
        
            

    }, 2000);

      
    
       
        
        
}   
