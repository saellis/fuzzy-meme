const User = require('../model/user.model');
const bcrypt = require('bcrypt');

var controller = {

  create: (req, res) => {
    if (!req.body.password || req.body.password.length < 8) {
      res.status(400).send({err: 'password invalid. must be a string of length >= 8'});
    } else if (!req.body.username){
      res.status(400).send({err: 'username invalid. must be a string of length > 0'});
    } else {
      bcrypt.hash(req.body.password, 8, (err, hash) => {
        var user = new User({
          username: req.body.username,
          password: hash,
          games: []
        });
        user.save((err, result) => {
          if(err) {
            if(err.code === 11000)
              res.status(400).send({err: 'username already exists'})
          } else {
            result.password = '[REDACTED]';
            res.status(200).send(result);
          }
        });
      });
    }
  },

  authenticate: (req, res) => {
    User.find({username: req.body.username}, (err, result) => {
      if (result.length == 1) {
        var user = result[0];
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (result) { //passwords match
            user.password = '[REDACTED]';
            res.status(200).send(user);
          } else { //passwords dont match
            res.status(400).send({err: 'incorrect password'});
          }
        });
      }
    });
  }
};

module.exports = controller;
