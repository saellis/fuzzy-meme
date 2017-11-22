const Game = require('../model/game.model');

var controller = {

  create: (req, res) => {
    if(!req.body.creatorId) {
      res.status(400).send({err: 'creator parameter cannot be blank'})
      return;
    }

    var game = new Game({
      users: [req.body.creatorId],
      creator: req.body.creatorId,
      currentPlayer: req.body.creatorId,
      currentPlayerActedOnce: false,
      faceUp: [],
      faceDown: [],
      discard: []
    });

    game.save((err, result) => {
      if(err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  },

  get: (req, res) => {
    Game.find({_id: req.body.gameId}, (err, games) => {
      if (err || !games || games.length == 0) {
        res.status(400).send({err: 'game not found'});
      } else {
        res.status(200).send(games[0]);
      }
    });
  }
};

//todo add await (game) => { /* clean up game (remove nonclient data) */ }

module.exports = controller;
