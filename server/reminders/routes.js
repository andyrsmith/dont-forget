var {mongoose} = require('../db/mongoose');
var {Reminder} = require('../models/reminder.js');
module.exports = function(router) {
  router.post('/reminders', (req, res) => {
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

  router.get('/reminders', (req, res) => {
    Reminder.find().then((reminders) => {
      res.send(reminders);
    }).catch((e) => {
      res.status(400).send(e);
    });  
  });

  router.get('/reminders/:id', (req, res) => {
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
};
