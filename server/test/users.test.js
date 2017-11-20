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
          .send({username: uname, password: 'Strongpassword123'})
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
          .send({username: uname, password: 'Strongpassword123'})
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
          .send({username: undefined, password: 'Strongpassword123'})
          .end((err, res) => {
            res.status.should.equal(400);
            done();
          });
      });

      it('Should not allow client to create a new user with existing username', (done) => {
        var uname = uuid();
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'})
          .end((err, res) => {
            chai.request(server)
              .post('/users/create')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({username: uname, password: 'Strongpassword123'})
              .end((err, res) => {
                res.body.err.should.equal('username already exists');
                done();
              });
          });
      });

      it('Should return an empty list of games', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'Strongpassword11'})
          .end((err, res) => {
            res.body.games.should.have.length(0);
            done();
          });
      });

      it('Should check password length', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'B1ad'})
          .end((err, res) => {
            res.status.should.equal(400);
            done();
        });
      });

      it('Should check password capitals', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'b11111111'})
          .end((err, res) => {
            res.status.should.equal(400);
            done();
        });
      });

      it('Should check password numbers', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'Badpwdddd'})
          .end((err, res) => {
            res.status.should.equal(400);
            done();
        });
      });

      it('Should allow strong passwords', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'GoodPassword123'})
          .end((err, res) => {
            res.status.should.not.equal(400);
            done();
        });
      });

      it('Should not allow user to have shitty username', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid().slice(0, 4), password: 'GoodPwd1233'})
          .end((err, res) => {
            res.status.should.equal(400);
            done();
        });
      });

      it('Should allow users to have strong passwords', (done) => {
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'Goodpwd123123'})
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
          .send({username: uname, password: 'Gooodpwd123123'})
          .end((err, res) => {
            chai.request(server)
              .post('/users/auth')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({username: uname, password: 'Gooodpwd123123'})
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
          .send({username: uname, password: 'Goodpwd123123'})
          .end((err, res) => {
            chai.request(server)
              .post('/users/auth')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({username: uname, password: 'wrong password'})
              .end((err, res) => {
                res.body.err.should.equal('incorrect password');
                done();
              });
          });
      });
  	});
  });
});
