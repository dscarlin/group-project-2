
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
        console.log(req.body)
        console.log(req.user.get())
        console.log(req.isAuthenticated())
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