module.exports = (app,db) => {
    const Op = db.Sequelize.Op;


   


    //create user
    app.post('api/user', (req, res) => {
        console.log('called post on user')
        let r = request.body;
        let userInfo = { 
            user_name: r.user_name,
            email: r.email,
            text_enabled: r.text_enabled,
            phone_number: r.phone_number,
            status: r.status

        };
        db.User.create(userInfo).then(result => res.json(result));
    })

    app.post('api/group', (req, res) => {
        console.log('called post on group')
        let groupName = req.params.name
        db.Group.create( {name: groupName})
        .then((result => res.json(result)));
    })

    app.post('api/user/group', (req, res) => {
        console.log('called post on userGroup')
        let groupId = req.body.groupId;
        let userId = req.body.userId;
        db.UserGroup.create( {UserId: userId, GroupId: groupId})
        .then((result => res.json(result)));
    })

    app.post('api/twilio',function(req,res){
        let body = req.body.message
        console.log('twilio post')
        // twilio.messages.create({
        //   body: body,
        //   from: trialNumber,
        //   to: '+19193682008'
        //   }).then(message => res.json(message.sid))
      })


}