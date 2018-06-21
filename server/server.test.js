const expect = require('expect');
const request = require('supertest');
const {Reminder} = require('./models/reminder.js');
const {app} = require('./server');
const {ObjectID} = require('mongodb');
const reminders = [{
  _id: new ObjectID(),
  title: 'Take a walk',
  description: 'Should take walk every day',
  date: '2018-06-30'
},
{
  _id: new ObjectID(),
  title: 'Pay for ticket',
  description: 'Have ticket should pay',
  date: '2018-07-05',
}]

beforeEach(() => {
  Reminder.deleteMany({ }, function (err) {
      if (err) return handleError(err);
  });
});
//POST
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
    // review why this is there
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
//GET
describe('GET /reminders', () => {
  it('should get a list of reminders', (done) => {
    Reminder.insertMany(reminders).then();

    request(app)
      .get('/reminders')
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2)
      })
      .end(done);
  });
});

//GET ID
describe('GET /reminders/:id', () => {
  it('should return one reminder from ID', (done) => {
    Reminder.insertMany(reminders).then();

    request(app)
      .get(`/reminders/${reminders[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.reminder[0].title).toBe(reminders[0].title);
        expect(res.body.reminder[0].description).toBe(reminders[0].description);
      })
      .end(done);
  });

  it('should return 404 if reminder not found', (done) => {
    var id = new ObjectID();
    request(app)
      .get(`/reminders/${id}`)
      .expect(404)
      .end(done);
  });
});
