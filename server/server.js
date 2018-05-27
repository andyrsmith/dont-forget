require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Started on port 3000');
});

app.post('/reminders', (req, res) => {
  res.send({
    title: req.body.title,
    description: req.body.description,
    dateOfReminder: req.body.dateOfReminder,
    completed: false});
});

module.exports = {app}

