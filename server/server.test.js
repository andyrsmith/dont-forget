const expect = require('expect');
const request = require('supertest');
const {Reminder} = require('./models/reminder.js');
const {app} = require('./server');

beforeEach(() => {
  Reminder.deleteMany({ }, function (err) {
      if (err) return handleError(err);
  });
});
describe('POST /reminders', () => {
  it('should create a new reminder', (done) => {
    var title = "Pay Bill";
    var description = "This is the electric bill";
    var dateOfReminder = '2018-5-31';

    request(app)
      .post('/reminders')
      .send({title, description, dateOfReminder})
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toBe(title);
        expect(res.body.description).toBe(description);
        expect(res.body.completed).toBe(false);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Reminder.find({title}).then((reminders) => {
          expect(reminders.length).toBe(1)
          expect(reminders[0].description).toBe(description);
          expect(reminders[0].completed).toBe(false);
          done();
        }).catch((e) => done(e)); 
      });
  });
});
