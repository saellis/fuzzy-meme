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
  describe('GET at root', () => {
	it('Status should be 200', (done) => {
		chai.request(server)
		    .get('/')
		    .end((err, res) => {
		        res.should.have.status(200);
		      	done();
		    });
	});
  });

  describe('POST /games', () => {
  	describe('Successfully creates game', () =>{
  		it('Status should be 200', (done) =>{
	  		chai.request(server)
			    .post('/games')
			    .end((err, res) => {
			        res.should.have.status(200);
			      	done();
			    });
		});
	  	it('Should return a new game id', (done) =>{
	  		chai.request(server)
			    .post('/games')
			    .end((err, res) => {
			        res.body.success.should.be.true;
			        res.body.id.should.be.a('string');
			      	done();
			    });
	  	});
  	});
  })

});