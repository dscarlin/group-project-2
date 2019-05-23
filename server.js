//Express vars
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();


//Database Vars
const db = require('./models')
//test db
// db.sequelize.sync({ force: true }).then(()=>{require('./relationshipTester')(db)})


//Twilio vars
require('dotenv').config()
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const trialNumber = process.env.TRIAL_NUMBER
const twilio = require('twilio')(accountSid, authToken);


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./db_routes/get_db.js')(app,db);

app.post('/twilio',function(req,res){
  let body = req.body.message
  console.log('twilio post')
  // twilio.messages.create({
  //   body: body,
  //   from: trialNumber,
  //   to: '+19193682008'
  //   }).then(message => res.json(message.sid))
})

db.sequelize.sync({ force: true }).then(()=>{
  require('./db_seeds2')(db)
  app.listen(PORT, function() { 
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});
