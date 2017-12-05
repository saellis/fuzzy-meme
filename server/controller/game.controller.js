import GameManipulator from '../model/game.manipulator';
import UserController from './user.controller';
import to from 'await-to-js';
import Haikunator from 'haikunator' ;

var controller = {

  create: async (req, res) => {
    if(!req.body.creatorId) {
      res.status(400).send({err: 'creator parameter cannot be blank'})
      return;
    }
    var userExists = await UserController.doesUserExist(req.body.creatorId);
    if (!userExists) {
      res.status(400).send({err: 'user does not exist'});
      return;
    }
    var haikunator = new Haikunator();
    var name = req.body.name || haikunator.haikunate({tokenLength: 4});
    var [err, game] = await to(GameManipulator.createGame(req.body.creatorId, name));
    if(err) {
      res.status(400).send({err: err.message});
    } else {
      res.status(200).send(game);
    }
  },

  get: async (req, res) => {
    if(req.query.gameId) {
      var [err,game] = await to(GameManipulator.getGame(req.query.gameId));
        if (err !== null) {
          res.status(500).send({err: err.message});
        } else if (!game) {
          res.status(400).send({err: 'game does not exist'});
        } else {
          res.status(200).send(game);
        }
    } else if(req.query.userId) {

        var [err, games] = await to(GameManipulator.getGamesForUser(req.query.userId));
        if (err) {
          res.status(500).send({err: err.message});
        } else {
          res.status(200).send(games);
        }
    } else {
      res.status(400).send({err: 'must supply a gameId or userId'});
    }

  }
};

module.exports = controller;
