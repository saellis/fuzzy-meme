//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let uuid = require('uuid/v1');
import 'babel-polyfill';
import to from 'await-to-js';

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
	  	it('Should return a new user id', async () => {
        var uname = uuid();
	  		var res = await chai.request(server)
			    .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'});
        res.body._id.should.be.a('string');
        res.body.username.should.equal(uname);
        return;
	  	}).timeout(2000);

      it('Should set username and password', async () => {
        var uname = uuid();
        var res = await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'});

        res.body.username.should.equal(uname);
        return;
      });

      it('Should error when invalid username is given', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: undefined, password: 'Strongpassword123'}));

        err.status.should.equal(400);
        return;
      });

      it('Should not allow client to create a new user with existing username', async () => {
        var uname = uuid();
        await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'});
        var [err, res] = await to(chai.request(server)
              .post('/users/create')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({username: uname, password: 'Strongpassword123'}));

        err.response.body.err.should.equal('username already exists');
        return;
      });

      it('Should check password length', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'B1ad'}));

        err.status.should.equal(400);
        return;
      });

      it('Should check password capitals', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'b11111111'}));

        err.status.should.equal(400);
        return;
      });

      it('Should check password numbers', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'Badpwdddd'}));

        err.status.should.equal(400);
        return;
      });

      it('Should check password lowercase', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'BADPASSWORD1'}));

        err.status.should.equal(400);
        return;
      });

      it('Should allow strong passwords', async () => {
        var res = await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'GoodPassword123'});

        res.status.should.not.equal(400);
        return;
      });

      it('Should not allow user to have shitty username', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid().slice(0, 4), password: 'GoodPwd1233'}));

        err.status.should.equal(400);
        return;
      });

      it('Should allow users to have strong passwords', async () => {
        var uname = uuid();
        var res = await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Goodpwd123123'})

        res.body.username.should.equal(uname);
        return;
      });

      it('Should authenticate user on correct password', async () => {
        var uname = uuid();
        await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Gooodpwd123123'});

        var res = await chai.request(server)
          .post('/users/auth')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Gooodpwd123123'});

        //should the be should.equal(uname)?
        res.body.username.should.not.equal(null);
        return;
      });
      it('Should not auth user on incorrect password', async () => {
        var uname = uuid();
        await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Goodpwd123123'});
        var [err, res] = await to(chai.request(server)
          .post('/users/auth')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'wrong password'}));

        err.response.body.err.should.equal('incorrect password');
        return;
      });
      it('Should error if user doesnt exist', async () => {
        var uname = uuid();
        var [err, res] = await to(chai.request(server)
              .post('/users/auth')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({username: uname, password: 'doesnt matter'}));
        err.response.body.err.should.equal('user does not exist');
        });
  	});
  });
});
