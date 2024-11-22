(async () => {
    const chai = await import('chai');
    const chaiHttp = await import('chai-http');
    const server = require('../server'); // CommonJS server
  
    chai.default.use(chaiHttp.default);
  
    // describe('Photos', function () {
    //   it('should list ALL photos on / GET', function (done) {
    //     this.timeout(60000);
  
    //     chai.default.request(server)
    //       .get('/')
    //       .end(function (err, res) {
    //         if (err) return done(err);
    //         res.should.have.status(200);
    //         res.should.be.html;
    //         chai.expect(res.body).to.be.an('object');
    //         done();
    //       });
    //   });
    // });
  })();
 