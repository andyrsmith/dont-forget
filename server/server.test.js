const expect = require('expect');
const request = require('supertest');

const {app} = require('./server');

describe('POST /reminders', () => {
  it('should create a new reminder', (done) => {
    var title = "Pay Bill";
    var description = "This is the electric bill";
    var dateOfReminder = new Date('2018-5-31');

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
        done();
      });
  });
});
