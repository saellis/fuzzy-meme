const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(
	(req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	;})

const game = require('./controller/game.controller');
const user = require('./controller/user.controller');

app.set("port", process.env.PORT || 3001);
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  require('dotenv').load();
}

/**
* @api {get} /game Get a game
* @apiName GetGame
* @apiGroup Games
* @apiParam {String} [id] ID of the game to get.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "_id": "001911010",
*       "users": ["123", "321", "789"],
*       "creator": "123",
*       "currentPlayer": "789",
*       "currentPlayerActedOnce": "false",
*       "faceUp": ["Red", "Blue", "White", "Pink", "Wild"]
*     }
*/
app.route('/games')
  .get(game.get);

  /**
  * @api {post} /games/create Create a game
  * @apiName CreateGame
  * @apiParam {String} [creatorID] id of the user who created the game
  * @apiGroup Games/Create
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "_id": "245789345",
  *       "users": ["123"],
  *       "creator": "123",
  *       "currentPlayer": "123",
  *       "currentPlayerActedOnce": "false",
  *       "faceUp": ["Red", "Blue", "White", "Pink", "Wild"]
  *     }
  */
app.route('/games/create')
  .post(game.create)


  /**
  * @api {post} /users/create Create a user
  * @apiName CreateUser
  * @apiParam {String} [username] the username of the new user
  * @apiParam {String} [password] the password for the new user
  * @apiGroup Users/Create
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "_id": "123",
  *       "username": "stephen120",
  *       "password": "[REDACTED]",
  *       "games": [],
  *       "trainHand": [],
  *       "routeHand": []
  *     }
  */
app.route('/users/create')
  .post(user.create);


  /**
  * @api {post} /users/auth Authenticate a user
  * @apiName AuthenticateUser
  * @apiParam {String} [username] the username of the new user
  * @apiParam {String} [password] the password for the new user
  * @apiGroup Users/Create
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "_id": "123",
  *       "username": "stephen120",
  *       "password": "[REDACTED]"
  *       "games": [],
  *       "trainHand": [],
  *       "routeHand": []
  *     }
  */
app.route('/users/auth')
  .post(user.authenticate)



var server = app.listen(3001, function () {
  var port = server.address().port;
});

module.exports = {app: app, server: server};
