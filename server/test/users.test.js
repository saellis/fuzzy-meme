//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
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
	  	test('Should return a new user id', async () => {
        var uname = uuid();
	  		var res = await chai.request(server)
			    .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'});
        expect(typeof res.body._id).toBe('string');
        expect(res.body.username).toBe(uname);
        return;
	  	})

      test('Should set username and password', async () => {
        var uname = uuid();
        var res = await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'});

        expect(res.body.username).toBe(uname);
        return;
      });

      test('Should error when invalid username is given', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: undefined, password: 'Strongpassword123'}));

        expect(err.status).toBe(400);
        return;
      });

      test('Should not allow client to create a new user with existing username', async () => {
        var uname = uuid();
        await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'});
        var [err, res] = await to(chai.request(server)
              .post('/users/create')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({username: uname, password: 'Strongpassword123'}));
        expect(err.response.body.err).toBe('username already exists');
        return;
      });

      test('Should check password length', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'B1ad'}));
        expect(err.response.body.err).toBe('password invalid. must be a string of length >= 8');
        expect(err.status).toBe(400);
        return;
      });

      test('Should check password capitals', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'b11111111'}));
        expect(err.response.body.err).toBe('password invalid. must have capital letters.');
        expect(err.status).toBe(400);
        return;
      });

      test('Should check password numbers', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'Badpwdddd'}));
        expect(err.response.body.err).toBe('password invalid. must have digits.');
        expect(err.status).toBe(400);
        return;
      });

      test('Should check password lowercase', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'BADPASSWORD1'}));
          //have to split this up because it errors if you dont... how fun
        var body = err.response.body;
        expect(body.err).toBe('password invalid. must have lowercase letters.');
        expect(err.status).toBe(400);
        return;
      });

      test('Should allow strong passwords', async () => {
        var res = await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid(), password: 'GoodPassword123'});
        expect(res.status).not.toBe(400);
        return;
      });

      test('Should not allow user to have shitty username', async () => {
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uuid().slice(0, 4), password: 'GoodPwd1233'}));
          //have to split this up because it errors if you dont... how fun
        var body = err.response.body;
        expect(body.err).toBe('username invalid. must be a string of length > 6');
        expect(err.status).toBe(400);
        return;
      });

      test('Should allow users to have strong passwords', async () => {
        var uname = uuid();
        var res = await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Goodpwd123123'})

        expect(res.body.username).toBe(uname);
        return;
      });

      test('Should authenticate user on correct password', async () => {
        var uname = uuid();
        await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Gooodpwd123123'});

        var res = await chai.request(server)
          .post('/users/auth')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Gooodpwd123123'});

        expect(res.body.username).toBe(uname);
        return;
      });
      test('Should not auth user on incorrect password', async () => {
        var uname = uuid();
        await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Goodpwd123123'});
        var [err, res] = await to(chai.request(server)
          .post('/users/auth')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'wrong password'}));
        expect(err.response.body.err).toBe('incorrect password');
        return;
      });
      test('Should error if user to be auth\'d doesnt exist', async () => {
        var uname = uuid();
        var [err, res] = await to(chai.request(server)
              .post('/users/auth')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({username: uname, password: 'doesnt matter'}));
        expect(err.response.body.err).toBe('user does not exist');
        });
  	});
  });
});
