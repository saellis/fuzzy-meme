const Game = require('../model/game.model');

var controller = {

  create: (req, res) => {
    if(!req.body.creator) {
      res.status(400).send({err: 'creator parameter cannot be blank'})
      return;
    }

    var game = new Game({
      users: [req.body.creator],
      creator: req.body.creator,
      currentPlayer: req.body.creator
    });
    game.save((err, result) => {
      if(err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.status(200).send(result);
    });
  },
  get: (req, res) => {
    Game.find((err, games) => {
      if (err) res.status(500).send(err);
      res.status(200).send({games: games});
    });
  }

};

module.exports = controller;
