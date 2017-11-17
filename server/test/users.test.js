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

  describe('POST /users', () => {
  	describe('Successfully creates user', () =>{
  		it('Status should be 200', (done) => {
	  		chai.request(server)
			    .post('/users')
			    .end((err, res) => {
			        res.should.have.status(200);
			      	done();
			    });
		  });
	  	it('Should return a new user id', (done) =>{
	  		chai.request(server)
			    .post('/users')
          .set('content-type', 'application/x-www-form-urlencoded')
			    .end((err, res) => {
			        res.body._id.should.be.a('string');
			      	done();
			    });
	  	});

      it('Should set username and password', (done) => {
        chai.request(server)
          .post('/users')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: 'userMcUserFace', password: 'pwd'})
          .end((err, res) => {
            res.body.username.should.equal('userMcUserFace');
            res.body.password.should.equal('pwd');
            done();
          });
      });

      it('Should return an empty list of games', (done) => {
        chai.request(server)
          .post('/users')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: 'userMcUserFace', password: 'pwd'})
          .end((err, res) => {
            res.body.games.should.have.length(0);
            done();
          });
      });

  	});
  });
});
