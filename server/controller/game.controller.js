const GameManipulator = require('../model/game.manipulator');

var controller = {

  create: (req, res) => {
    if(!req.body.creatorId) {
      res.status(400).send({err: 'creator parameter cannot be blank'})
      return;
    }
    GameManipulator.createGame(req.body.creatorId, (err, result) => {
      if(err !== null) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },

  get: (req, res) => {
    GameManipulator.getGame(req.body.gameId, (err, game) => {
      if (err !== null) {
        res.status(500).send(err);
      } else if (!game) {
        res.status(400).send({err: 'game does not exist'});
      } else {
        res.status(200).send(game);
      }
    });
  }
};

//todo add await (game) => { /* clean up game (remove nonclient data) */ }

module.exports = controller;
