const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Ensure server.js is properly exported

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

describe('Photos', function () {
  it('should list ALL photos on / GET', function (done) {
    this.timeout(60000);

    chai.request(server)
      .get('/')
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.should.be.html;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
