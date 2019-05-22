const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

// Sample API
app.get('/api/userId', (req, res) => {
  console.log('requested user id')
  res.json({id: 1  });
});

app.get('/api/groups/:id', (req,res) => {
  console.log('requested user groups')
  res.json({request: 'groups has been requested'})
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
