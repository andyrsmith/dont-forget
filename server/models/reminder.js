var mongoose = require('mongoose');

var Reminder = mongoose.model('Reminder', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String
  },
  dateOfReminder: {
    type: Number,
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = {Reminder};
