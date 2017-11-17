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

  describe('POST /games', () => {
  	describe('Successfully creates game', () =>{
  		it('Status should be 200', (done) => {
	  		chai.request(server)
			    .post('/games')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({'creator': 'jnsdfb87hg345ghso89745b'})
			    .end((err, res) => {
			        res.should.have.status(200);
			      	done();
			    });
		  });
	  	it('Should return a new game id', (done) =>{
	  		chai.request(server)
			    .post('/games')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({'creator': 'jnsdfb87hg345ghso89745b'})
			    .end((err, res) => {
			        res.body._id.should.be.a('string');
			      	done();
			    });
	  	});

      it('Should set creator and currentPlayer', (done) => {
        chai.request(server)
          .post('/games')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({'creator': 'jnsdfb87hg345ghso89745b'})
          .end((err, res) => {
            res.body.creator.should.equal('jnsdfb87hg345ghso89745b');
            res.body.currentPlayer.should.equal('jnsdfb87hg345ghso89745b');
            done();
          });
      });

      it('Should complain when no creator is specified', (done) => {
        chai.request(server)
          .post('/games')
          .set('content-type', 'application/x-www-form-urlencoded')
          .end((err, res) => {
            res.should.have.status(400);
            done();
          });
      });
  	});

    describe('GET /games', () => {
      it('Should get list of all games', (done) => {

        chai.request(server)
          .post('/games')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({'creator': 'get-games-creator'})
          .end((err, res) => {
              chai.request(server)
                .get('/games')
                .end((err, res) => {
                  res.body.length.should.be.greaterThan(0);
                  done();
                });
          });
      });
    });
  });
});
