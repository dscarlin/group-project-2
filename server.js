//Express vars
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//passport vars
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

//Database Vars
const db = require('./models');

//session vars
const session = require('express-session');
const SessionStore = require('express-session-sequelize')(session.Store);
const sequelizeSessionStore = new SessionStore({
  db: db.sequelize
})

// encryption service
const bcrypt = require('bcrypt')
//fileUpload middleware
const fileUpload = require('express-fileupload');
app.use(fileUpload());




//Twilio vars
require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const trialNumber = process.env.TRIAL_NUMBER
const twilio = require('twilio')(accountSid, authToken);


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}


//express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sessionStore middleware
app.use(session({
  secret: "azzip",
  store: sequelizeSessionStore,
  resave: false,
  saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});
require('./config/auth.js')(LocalStrategy, passport, bcrypt, db)


require('./db_routes/get_db.js')(app,db);
require('./db_routes/post_db.js')(LocalStrategy,passport,app,db,bcrypt);
require('./db_routes/put_db.js')(app,db,bcrypt);
require('./db_routes/delete_db.js')(app,db);



db.sequelize.sync({ force: true }).then(()=>{
  require('./db_seeds2')(db,bcrypt);
  app.listen(PORT, function() { 
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
