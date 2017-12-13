// Require the dev-dependencies
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
   //
   describe('POST /games/create', () => {
   	describe('Successfully creates game', () => {
   		test('Should return new game object', async () => {
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
         expect(typeof res.body._id).toBe('string');
         expect(res.body.creator_id).toBe(creatorId);
         expect(res.body.current_player_id).toBe(creatorId);
         return;
 		  })

       test('Should store game name in database', async () => {
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
           expect(res.body.name).toBe(gamename);
           return;
   		  })

       test('Should generate a random name if one is not supplied', async () => {
         var uname = uuid();
         var res = await chai.request(server)
           .post('/users/create')
           .set('content-type', 'application/x-www-form-urlencoded')
           .send({username: uname, password: 'Strongpassword123'});
         var res = await chai.request(server)
               .post('/games/create')
               .set('content-type', 'application/x-www-form-urlencoded')
               .send({'creatorId': res.body._id});
         expect(res.body.name).toContain('-');
         return;
       })

       test('Should complain if the game name already exists', async () => {
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
         expect(err.status).toBe(400);
         return;
       })

       test('Should complain when no creator is specified', async () => {
         var uname = uuid();
         var [err, res] = await to(chai.request(server)
                   .post('/games/create')
               .set('content-type', 'application/x-www-form-urlencoded'));
         expect(err.status).toBeGreaterThanOrEqual(400);
         expect(err.status).toBeLessThanOrEqual(401);
         return;
       })

       test('Should complain when creatorId does not map to an existing user', async () => {
         var uname = uuid();
         var [err, res] = await to(chai.request(server)
               .post('/games/create')
               .set('content-type', 'application/x-www-form-urlencoded')
               .send({'creatorId': uname}));

         expect(err.response.body.err).toBe('user does not exist');
         return;
       })
     });
   });
   describe('GET /games', () => {

     test('Should get a game by id', async () => {
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

       expect(res.body._id).not.toBe(null);
       return;
     })

     test('Should fail when getting a game w/ a bad id', async () => {
       var [err, res] = await to(chai.request(server)
         .get('/games')
         .set('content-type', 'application/x-www-form-urlencoded')
         .query({'gameId': 'probably not a game id'}));
       expect(err.status).toBeGreaterThanOrEqual(400);
       expect(err.status).toBeLessThanOrEqual(401);
       return;
     });

     test('Should notify client when no gameId or userId is supplied', async () => {
       var [err, res] = await to(chai.request(server)
         .get('/games')
         .set('content-type', 'application/x-www-form-urlencoded'))
       expect(err.response.body.err).toBe('must supply a gameId or userId');
       return;
     });

     test('Should return an empty list when getting games for a user that has no games', async () => {
       var uname = uuid();
       var res = await chai.request(server)
         .post('/users/create')
         .set('content-type', 'application/x-www-form-urlencoded')
         .send({username: uname, password: 'Strongpassword123'});

       res = await chai.request(server)
             .get('/games')
             .set('content-type', 'application/x-www-form-urlencoded')
             .query({'userId': res.body._id})

       expect(res.body.length).toBe(0);
       return;
     })

     test('Should get all games that user is a part of', async () => {
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

       expect(res.body.length).toBe(1);
       return;
     })
   });
 });
