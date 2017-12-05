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

  describe('POST /games/create', () => {
  	describe('Successfully creates game', () => {
  		it('Should return new game object', async () => {
        var uname = uuid();
        var [err, res] = await to(chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'}));
        var creatorId = res.body._id;
        [err, res] = await to(chai.request(server)
    			    .post('/games/create')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({'creatorId': creatorId}));
        res.body._id.should.be.a('string');
        res.body.creator_id.should.equal(creatorId);
        res.body.current_player_id.should.equal(creatorId);
        return;
		  }).timeout(10000);

      it('Should store game name in database', async () => {
          var uname = uuid();
          var gamename = uuid();
          var res = await chai.request(server)
            .post('/users/create')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: uname, password: 'Strongpassword123'});

          var res = await chai.request(server)
      			    .post('/games/create')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({'creatorId': res.body._id, 'name': gamename});
          res.body.name.should.equal(gamename);
          return;
  		  }).timeout(10000);

      it('Should generate a random name if one is not supplied', async () => {
        var uname = uuid();
        var res = await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'});
        var res = await chai.request(server)
              .post('/games/create')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({'creatorId': res.body._id});
        res.body.name.should.contain('-');
        return;
      }).timeout(10000);

      it('Should complain if the game name already exists', async () => {
        var uname = uuid();
        var gamename = uuid();
        var res = await chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'});
        await chai.request(server)
              .post('/games/create')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({'creatorId': res.body._id, 'name': gamename});
        var [err, res] = await to(chai.request(server)
              .post('/games/create')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({'creatorId': res.body._id, 'name': gamename}));
        err.status.should.equal(400);
        return;
      }).timeout(10000);

      it('Should complain when no creator is specified', async () => {
          var uname = uuid();
          var [err, res] = await to(chai.request(server)
      			    .post('/games/create')
                .set('content-type', 'application/x-www-form-urlencoded'));
          err.status.should.be.within(400, 401);
          return;
      }).timeout(10000);

      it('Should complain when creatorId does not map to an existing user', async () => {
        var uname = uuid();
        var [err, res] = await to(chai.request(server)
              .post('/games/create')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({'creatorId': uname}));

        err.response.body.err.should.equal('user does not exist');
        return;
      }).timeout(10000);
    });
  });
  describe('GET /games', () => {

    it('Should get a game by id', async () => {
      var uname = uuid();
      var res = await chai.request(server)
        .post('/users/create')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: uname, password: 'Strongpassword123'});
      res = await chai.request(server)
        .post('/games/create')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({'creatorId': res.body._id});
      res = await chai.request(server)
            .get('/games')
            .set('content-type', 'application/x-www-form-urlencoded')
            .query({'gameId': res.body._id});

      res.body._id.should.not.equal(null);
      return;
    }).timeout(5000);

    it('Should fail when getting a game w/ a bad id', async () => {
      var [err, res] = await to(chai.request(server)
        .get('/games')
        .set('content-type', 'application/x-www-form-urlencoded')
        .query({'gameId': 'probably not a game id'}));
      err.status.should.be.within(400, 401);
      return;
    });

    it('Should notify client when no gameId or userId is supplied', async () => {
      var [err, res] = await to(chai.request(server)
        .get('/games')
        .set('content-type', 'application/x-www-form-urlencoded'))
      err.response.body.err.should.equal('must supply a gameId or userId');
      return;
    });

    it('Should return an empty list when getting games for a user that has no games', async () => {
      var uname = uuid();
      var res = await chai.request(server)
        .post('/users/create')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: uname, password: 'Strongpassword123'});

      res = await chai.request(server)
            .get('/games')
            .set('content-type', 'application/x-www-form-urlencoded')
            .query({'userId': res.body._id})

      res.body.length.should.equal(0);
      return;
    }).timeout(10000);

    it('Should get all games that user is a part of', async () => {
      var uname = uuid();
      var res = await chai.request(server)
            .post('/users/create')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: uname, password: 'Strongpassword123'});
      res = await chai.request(server)
            .post('/games/create')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({'creatorId': res.body._id});
      res = await chai.request(server)
            .get('/games')
            .set('content-type', 'application/x-www-form-urlencoded')
            .query({'userId': res.body.creator_id});

      res.body.length.should.equal(1);
      return;
    }).timeout(10000);
  });
});
