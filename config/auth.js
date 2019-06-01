module.exports = (LocalStrategy, passport, bcrypt, db) => {

  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, (username, password, done) => {
    console.log("\n \x1b[44m > \x1b[1m\x1b[33m" + "Local Strategy " + "\x1b[40m" + "  " + 
      "\x1b[0m" + username + " @ " + password);

    db.User.findOne({
        where: {
          email: username
        }
      })
      .then((entries) => {
        if (!entries) {
          console.log("Cannot find email in database");
          return done(null, false, { message: "Incorrect Username" });
        } else {
          // console.log(entries.dataValues);
          const hash = entries.dataValues.password;

          bcrypt.compare(password, hash)
          .then((res) => {
            
            if (res) { // match == true
              console.log("Matching password found");
              return done(null, entries);
            } else {
              console.log("Wrong password detected");
              return done(null, false, { message: "Incorrect Password" });
            }
          })
          .catch((err) => console.log(err.message));
        }

      })
      .catch((err) => res.json({ error: err.message }));

  }));

  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser( (id, done) => {
    db.User.findOne({
      where: {
        id: id
      }
    }).then((user) => {
      done(null, user);
    });
  });


}; // end export{}