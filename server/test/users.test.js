//During the test the env variable is set to test

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let uuid = require('uuid/v1');

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

  describe('POST /users/create', () => {
  	describe('Successfully creates user', () => {
	  	it('Should return a new user id', (done) => {
        var uname = uuid();
	  		chai.request(server)
			    .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'strongpassword'})
			    .end((err, res) => {
			        res.body._id.should.be.a('string');
			      	done();
			    });
	  	});

      it('Should set username and password', (done) => {
        var uname = uuid();
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'strongpassword'})
          .end((err, res) => {
            res.body.username.should.equal(uname);
            res.body.password.should.equal('[REDACTED]');
            done();
          });
      });

      it('Should error when invalid username is given', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: undefined, password: 'strongpassword'})
          .end((err, res) => {
            res.body.err.should.equal('username invalid. must be a string of length > 0');
            done();
          });
      });

      it('Should not allow client to create a new user with existing username', (done) => {
        var uname = uuid();
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'strongpassword'})
          .end((err, res) => {
            chai.request(server)
              .post('/users/create')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({username: uname, password: 'strongpassword'})
              .end((err, res) => {
                console.log(res.body)
                res.body.err.should.equal('username already exists');
                done();
              });
          });
      });

      it('Should return an empty list of games', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'strongpassword'})
          .end((err, res) => {
            res.body.games.should.have.length(0);
            done();
          });
      });

      it('Should not allow user to have a shiity password (null or length < 8 chars)', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'badpwd'})
          .end((err, res) => {
            res.body.err.should.not.equal(null);
            done();
        });
      });

      it('Should allow users to have strong passwords', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'gooodpwd'})
          .end((err, res) => {
            res.body.password.should.equal('[REDACTED]');
            done();
          });
      });

      it('Should authenticate user on correct password', (done) => {
        var uname = uuid();
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'gooodpwd'})
          .end((err, res) => {
            chai.request(server)
              .post('/users/auth')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({username: uname, password: 'gooodpwd'})
              .end((err, res) => {
                res.body.username.should.not.equal(null);
                done();
              });
          });
      });
      it('Should not auth user on incorrect password', (done) => {
        var uname = uuid();
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'gooodpwd'})
          .end((err, res) => {
            chai.request(server)
              .post('/users/auth')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({username: uname, password: 'wrong password'})
              .end((err, res) => {
              console.log(res.body)
                res.body.err.should.equal('incorrect password');
                done();
              });
          });
      });
  	});
  });
});
