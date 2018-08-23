require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
require('./reminders/routes') (app)
const port = process.env.PORT;
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
//TODO PUT in routes file
 
// Need delete and put
module.exports = {app}

