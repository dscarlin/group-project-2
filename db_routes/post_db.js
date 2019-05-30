
module.exports = (LocalStrategy, passport, app, db, bcrypt) => {
  const Op = db.Sequelize.Op;
  const saltRounds = 8;

  // Route for user login
  app.post("/login", passport.authenticate("local"), (req, res) => {
    //console.log(req.body);
    console.log(req.user.get());
    console.log(req.isAuthenticated());

    res.json(req.user.id);
  });

  // Route to create user
  app.post("/api/user", (req, res) => {
    console.log("called post on user");

    let r = req.body;
    bcrypt.hash(r.password, saltRounds, (err, hash) => {
      let userInfo = {
        user_name: r.user_name,
        email: r.email,
        password: hash,
        phone_number: r.phone_number
      };

      console.log(userInfo.password);
      db.User.create(userInfo).then( (result) => res.json(result) );
    });
  });

  // Route to create a group
  app.post("/api/group/:uid", (req, res) => {
    console.log("called post on group");

    let query = {
      name: req.body.groupName
    };

    db.Group.create(query).then( (result) => {
      console.log(result.id);
      db.UserGroup.create({
        UserId: req.params.uid,
        GroupId: result.id
      }).then( (result) => {
        res.json(result);
      });
    });
  });

  // Route to create user-group
  app.post("/api/user/:groupId", (req, res) => {
    console.log("called post on userGroup");

    let groupId = req.params.groupId;
    let userId = req.body.userId;
    console.log(groupId);
    console.log(userId);
    db.UserGroup.create({
      UserId: userId,
      GroupId: groupId
    }).then( (result) => {
      res.json(result);
    });
  });

  // Route for twilio messaging
  app.post("/api/twilio", (req, res) => {
    let body = req.body.message;
    console.log("twilio post");
    // twilio.messages.create({
    //   body: body,
    //   from: trialNumber,
    //   to: '+19193682008'
    //   }).then(message => res.json(message.sid))
  });

}; // end export{}