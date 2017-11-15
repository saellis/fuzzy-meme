//During the test the env variable is set to test

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Server', () => {

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

});