//During the test the env variable is set to test

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Server', () => {
  var server;
  beforeEach(function () {
    server = require('../server', { bustCache: true }).server;
  });
  afterEach(function (done) {
    server.close(done);
  });
 /*
  * Test the /GET route
  */
  describe('/GET', () => {
	it('it should GET', (done) => {
		chai.request(server)
		    .get('/')
		    .end((err, res) => {
		        res.should.have.status(200);
		      	done();
		    });
	});
  });

  describe('POST', () => {
  	it('it should post', (done) =>{
  		chai.request(server)
		    .post('/games')
		    .end((err, res) => {
		        res.should.have.status(200);
		      	done();
		    });
  	})
  })

});