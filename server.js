//Express vars
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();


//fileUpload middleware
const fileUpload = require('express-fileupload');
app.use(fileUpload());

//Database Vars
const db = require('./models');



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

require('./db_routes/get_db.js')(app,db);
require('./db_routes/post_db.js')(app,db);
require('./db_routes/put_db.js')(app,db);
require('./db_routes/delete_db.js')(app,db);



db.sequelize.sync({ force: false }).then(()=>{
  // require('./db_seeds2')(db);
  app.listen(PORT, function() { 
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
