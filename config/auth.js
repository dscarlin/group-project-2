
module.exports = (LocalStrategy, passport, bcrypt, db) => {


        passport.use(new LocalStrategy({
            usernameField: "email",
            passwordField: "password"
        }, function(username, password, done) {
            console.log(username);
            console.log(password);
        
            db.User.findOne({
                where: { 
                    email: username
                },
            }).then(function(entries){
                if (!entries) {
                    console.log("Cannot find email in database");
                    return done(null, false, { message: 'Incorrect Username'}); //Unhandled rejection Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
                } 
                 else {
        
                    console.log(entries.dataValues);
                    
                    const hash = entries.dataValues.password;
        
                    bcrypt.compare(password, hash, function(err, res) {
                        if (err) { done(err); }
        
                        if (res) { // match == true
                            console.log("matching password");
                            return done(null, entries);
                        } else {

                            console.log("wrong password");
                            return done(null, false, { message: 'Incorrect Password'});
                        }
                    });
                }
        
            });
            
            // return done(null, false);
        }
        ));

        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
        
        passport.deserializeUser(function(id, done) {
            db.User.findOne({where: { id: id}}).then(user => {

                done(null, user);
            })
        });
    
}


