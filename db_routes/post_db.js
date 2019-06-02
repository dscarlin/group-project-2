module.exports = (LocalStrategy, passport, app, db, bcrypt) => {
  const Op = db.Sequelize.Op;
  const saltRounds = 8

  // Route for user login
  app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) { 
        return next(err);
      }

      if (!user) {
        console.log("Login authentication error");
        return res.status(403).send({
          message: info.message,
          error: "Invalid login credentials"
        });
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        
        console.log("Login authentication success");
        console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
          req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
          "\x1b[0m" + "Authenticated: " + req.isAuthenticated() + " @ {JSON}\n" +
          JSON.stringify(req.user.get(), null, 2));
        
        return res.json(req.user);
      });
    })(req, res, next);
  });

 
  // Route to create user
  app.post("/api/user", (req, res) => {
    // Destructure Object
    const { user_name, email, password, phone_number } = req.body;

    db.User.findOne({
      where: {
        email: email
      }
    })
    .then( (found) => {

      if (found) {
        console.log("Email address is already taken");
        throw new Error("Email address found in database");
        //return res.status(409).send({ /*error: err, */ message: "db.user - where" });
      }

      console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
        req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
        "\x1b[0m" + "Create user: " + user_name);
      
      bcrypt.hash(password, saltRounds)
      .then((hash) => {
        let userInfo = {
          user_name: user_name,
          email: email,
          password: hash,
          phone_number: phone_number
        };

        db.User.create(userInfo)
          .then((result) => { return res.json(result) })
          .catch((err) => res.json({ error: err.message, message: "db.user - create" }));
          })
      .catch((err) => res.json({ error: err.message, message: "bcrypt" }));

    })
    .catch(err => {
      res.status(409).send({error: "Email address is already taken", message: "db.user - where" });
    });

  });

  // Route to create a group
  app.post("/api/group/:uid", (req, res) => {
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
      req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
      "\x1b[0m" + "Create group for: " + req.body.groupName);

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
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
      req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
      "\x1b[0m" + "Create user group for (user, group): " + req.body.userId +
      " : " + req.params.groupId);

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
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" +
      req.method + " \x1b[40m " + "\x1b[36m " + req.url + "  " +
      "\x1b[0m" + "Twilio post for: " + req.body.message);
    
      let body = req.body.message;
    // twilio.messages.create({
    //   body: body,
    //   from: trialNumber,
    //   to: '+19193682008'
    //   }).then(message => res.json(message.sid))
  });

}; // end export{}