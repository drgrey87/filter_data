const request = require('supertest'),
  app = require('../../app'),
  expect = require('chai').expect,
  get_distance = require('../../helpers'),
  post_data = {
    age: {from: 10, to: 95},
    compatibility_score: {from: 98, to: 99, divider: 100},
    contacts_exchanged: {value: true},
    distance: {value: 30},
    favourite: {value: true},
    height_in_cm: {from: 35, to: 210},
    main_photo: {value: true}
  };

describe('Server tests the root path', () => {

  it('Check root GET method', (done) => {
    return request(app).get('/').then((response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.text).to.not.be.empty;
      done();
    });
  });

  it('Check POST data/', (done) => {
    return request(app).post('/data').send(post_data).then((response) => {
      expect(response.statusCode).to.equal(200);
      expect(response.body).to.be.a('array');
      done();
    });
  });

  it('Check get_distance', (done) => {
    let lat1 = 53.801277,
      lon1 = -1.548567,
      lat2 = 52.412811,
      lon2 = -1.778197,
      distance = get_distance(lat1, lon1, lat2, lon2);

      expect(distance).to.not.be.empty;
      expect(distance).to.equal(155.14920516827524);
      done();
  });
});