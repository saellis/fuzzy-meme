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

  describe('POST /games/create', () => {
  	describe('Successfully creates game', () => {
  		it('Should return new game object', (done) => {
        var uname = uuid();
        chai.request(server)
          .post('/users/create')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({username: uname, password: 'Strongpassword123'})
          .end((err, res) => {
            chai.request(server)
    			    .post('/games/create')
              .set('content-type', 'application/x-www-form-urlencoded')
              .send({'creatorId': uname})
    			    .end((err, res) => {
    			        res.should.have.property('status', 200);
    			        res.body._id.should.be.a('string');
                  res.body.creator_id.should.equal(uname);
                  res.body.current_player_id.should.equal(uname);
                  res.body.players.should.contain(uname);
    			      	done();
    			    });
          });
		  });

      it('Should complain when no creator is specified', (done) => {
          var uname = uuid();
          chai.request(server)
      			    .post('/games/create')
                .set('content-type', 'application/x-www-form-urlencoded')
      			    .end((err, res) => {
                    res.should.have.property('status', 400);
      			      	done();
      			    });
      });
    });
  });
  describe('GET /games', () => {

    it('Should get a game by id', (done) => {
      chai.request(server)
        .post('/games/create')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({'creatorId': 'jnsdfb87hg345ghso89745b'})
        .end((err, res) => {
          chai.request(server)
            .get('/games')
            .set('content-type', 'application/x-www-form-urlencoded')
            .query({'gameId': res.body._id})
            .end((err, res) => {
              res.body._id.should.not.equal(null);
              done();
            });
        });
    });

    it('Should fail when getting a game w/ a bad id', (done) => {
      chai.request(server)
        .get('/games')
        .set('content-type', 'application/x-www-form-urlencoded')
        .query({'gameId': 'probably not a game id'})
        .end((err, res) => {
          res.body.err.should.equal('game does not exist');
          done();
        });
    });

    it('Should notify client when no gameId or userId is supplied', (done) => {
      chai.request(server)
        .get('/games')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          res.body.err.should.equal('must supply a gameId or userId');
          done();
        });
    });

    it('Should return an empty list when getting games for a user that has no games', (done) => {
      var uname = uuid();
      chai.request(server)
        .post('/users/create')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: uname, password: 'Strongpassword123'})
        .end((err, res) => {
          chai.request(server)
            .get('/games')
            .set('content-type', 'application/x-www-form-urlencoded')
            .query({'userId': res.body._id})
            .end((err, res) => {
              res.body.length.should.equal(0);
              done();
            });
        });
    });

    it('Should get all games that user is a part of', (done) => {
      var uname = uuid();
      chai.request(server)
        .post('/users/create')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: uname, password: 'Strongpassword123'})
        .end((err, res) => {
          chai.request(server)
            .post('/games/create')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({'creatorId': res.body._id})
            .end((err, res) => {
              chai.request(server)
                .get('/games')
                .set('content-type', 'application/x-www-form-urlencoded')
                .query({'userId': res.body.creator_id})
                .end((err, res) => {
                  res.body.length.should.equal(1);
                  done();
                });
            });
        });
    });
  });
});
