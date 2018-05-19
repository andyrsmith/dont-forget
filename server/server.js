var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.listen(3000, () => {
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

