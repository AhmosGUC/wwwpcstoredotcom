const request = require('supertest')
const app = require('./index')
const assert = require('assert');
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();

setTimeout(() => {
  describe('Get Endpoints', () => {
    it('should return list of CPUs', async () => {
      const res = await request(app).get('/computers/cpu');
      assert.equal(res.statusCode, 200);
      res.body.should.have.property('count');
      res.body.should.have.property('cpus');
    })
  })
  run();
}, 3 * 1000);

