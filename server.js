// Express
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

// Authentication Handler - Passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Database Import
const db = require("./models");

// Cookie + Session Handler
const session = require("express-session");
const SessionStore = require("express-session-sequelize")(session.Store);
const sequelizeSessionStore = new SessionStore({
  db: db.sequelize
})

// AWS s3 contianer vars
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-east-1';

//socket vars
var http = require('http').createServer(app);
var io = require('socket.io')(http);
io.on('connection', function(socket) {
  socket.on('rejoin', function(object) {
    console.log(`\u001b[35;1m re-joined chanel ${object.name}`);
    socket.join(object.chanel)
  })
  socket.on('leave', function(object) {
    console.log(`\u001b[35;1m leaving chanel ${object.name}`);
    
    socket.leave(object.chanel)
  })

  socket.on('updateGroups', function(array){
    console.log(`\u001b[35;1m update ${array}`);
    socket.broadcast.emit('update', array)
  })

  socket.on('join', function(object) {
    
          console.log('\u001b[35;1m',object.name,' requested')
          socket.join(object.chanel);
          socket.in(object.chanel).emit('message',object.message);


      // io.sockets.in(room.room).emit('message', 'anyone in this room yet?');
  });

});

// Hash Encryption Package
const bcrypt = require("bcrypt");

// Twilio Package
require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const trialNumber = process.env.TRIAL_NUMBER;
const twilio = require("twilio")(accountSid, authToken);


// Serve up static assets (usually on heroku)
app.use(express.static("client/dist"));


//socket listener and response handler for dynamic routing


// Apply Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Apply SessionStore middleware
app.use(session({
  secret: "azzip",
  store: sequelizeSessionStore,
  resave: false,
  saveUninitialized: false
}));

// Apply Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

require("./config/auth.js")(LocalStrategy, passport, bcrypt, db);

require("./db_routes/get_db.js")(app, db, aws, S3_BUCKET);
require("./db_routes/post_db.js")(passport, app, db, bcrypt,trialNumber,twilio);
require("./db_routes/put_db.js")(app, db, bcrypt);
require("./db_routes/delete_db.js")(app, db);



db.sequelize.sync({ force: false }).then(()=>{
  //require('./db_seeds2')(db,bcrypt);
  http.listen(PORT, function() { 
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
