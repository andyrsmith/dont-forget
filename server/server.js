require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Reminder} = require('./models/reminder.js');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log('Started on port 3000');
});
//TODO PUT in routes file
app.post('/reminders', (req, res) => {
  var reminder = new Reminder({
    title: req.body.title,
    description: req.body.description,
    dateOfReminder: new Date(req.body.dateOfReminder)
  });
  reminder.save().then((reminder) => {
    res.send(reminder);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/reminders', (req, res) => {
  Reminder.find().then((reminders) => {
    res.send(reminders);
  }).catch((e) => {
    res.status(400).send(e);
  });  
});

app.get('/reminders/:id', (req, res) => {
  var id = req.params.id;

  Reminder.find({_id: id}).then((reminder) => {
    if (reminder.length === 0) {
      res.status(404).send();
    }
    res.send({reminder});
  }).catch((e) => {
    res.status(400).send(e);
  }); 
}); 

module.exports = {app}

