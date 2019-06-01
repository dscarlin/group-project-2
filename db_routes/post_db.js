
module.exports = (LocalStrategy,passport,app,db,bcrypt) => {
    const Op = db.Sequelize.Op;
    const saltRounds = 8

    
    // passport.use(new LocalStrategy({
    //     usernameField: "email",
    //     passwordField: "password"
    // }, function(username, password, done) {
    //     console.log(username);
    //     console.log(password);
    //     return done(null, "done")
    
    // }));

    //login
    app.post('/login',passport.authenticate("local"), (req, res) => {
        console.log('login ',req.isAuthenticated())
        res.json(req.user.id)

        // res.send('')
    })

    //create user
    app.post('/api/user',  (req, res) => {
        console.log('called post on user')
        let r = req.body;
        bcrypt.hash(r.password, saltRounds, (err, hash) => {
            let userInfo = { 
                user_name: r.user_name,
                email: r.email,
                password: hash,
                phone_number: r.phone_number
            };
            console.log(userInfo.password)
            db.User.create(userInfo).then(result => res.json(result));
        });
    });

    app.post('/api/group/:uid', (req, res) => {
        console.log('called post on group')

        
        let query = {name: req.body.groupName}
        db.Group.create(query)
        .then((result => {
            console.log(result.id)
            db.UserGroup.create({UserId: req.params.uid,GroupId: result.id})
            .then(result => {res.json(result)});
        }));
    })

    app.post('/api/user/:groupId', (req, res) => {
        console.log('called post on userGroup')
        let groupId = req.params.groupId;
        let userId = req.body.userId;
        console.log(groupId)
        console.log(userId)
        db.UserGroup.create( {UserId: userId, GroupId: groupId})
        .then((result => res.json(result)));
    })

    app.post('/api/twilio',function(req,res){
        let body = req.body.message
        console.log('twilio post')
        // twilio.messages.create({
        //   body: body,
        //   from: trialNumber,
        //   to: '+19193682008'
        //   }).then(message => res.json(message.sid))
      })

   
   


}