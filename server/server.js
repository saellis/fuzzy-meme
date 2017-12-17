const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
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
* @apiParam {String} [gameId] ID of the game to get.
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

/**
* @api {get} /game Get all games user is a part of
* @apiName GetGame
* @apiGroup Games
* @apiParam {String} [userId] ID of the user whose games to get.
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     [{
*       "_id": "001911010",
*       "users": ["123", "321", "789"],
*       "creator": "123",
*       "currentPlayer": "789",
*       "currentPlayerActedOnce": "false",
*       "faceUp": ["Red", "Blue", "White", "Pink", "Wild"]
*     }, ...]
*/
app.route('/games')
  .get(game.get);

app.route('/test')
	.get((req, res) => {
		res.send({'This ': 'should show up if the server is online'});
	});

  /**
  * @api {post} /games/create Create a game
  * @apiName CreateGame
  * @apiParam {String} [creatorId] id of the user who created the game
	* @apiParam {String} [name] name of the game. if not supplied, server will randomly generate one and send it back.
  * @apiGroup Games/Create
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "_id": "245789345",
	*       "name": "My First Game",
  *       "creator_id": "123",
  *       "current_player": "123",
  *       "current_player_acted_once": "false",
  *       "face_up_trains": ["Red", "Blue", "White", "Pink", "Wild"],
	*				"face_down_trains": ["Blue", ...],
  *  			"discarded_trains": ["White", ...],
  *  			"route_cards": ['vw35ety6y', 'dsfg45y', ...],
  *			  "discarded_route_cards": ['euvy46gv56', 'gv457467', ...]
  *     }
  */
app.route('/games/create')
  .post(game.create);


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
  *       "username": "stephen120"
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
  *       "username": "stephen120"
  *     }
  */
app.route('/users/auth')
  .post(user.authenticate);


app.route('/users/list')
	.get(user.list);

app.route('/invite')
	.post(user.invite);



var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
});

module.exports = {app: app, server: server};
