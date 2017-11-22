const UserManipulator = require('../model/user.manipulator');
const bcrypt = require('bcrypt');

var controller = {

  create: (req, res) => {
    if(!req.body.password || !req.body.password.match(/.{8,}/)) {
      res.status(400).send({err: 'password invalid. must be a string of length >= 8'});
    } else if(!req.body.password.match(/.*[A-Z].*/)) {
        res.status(400).send({err: 'password invalid. must have capital letters.'});
    } else if(!req.body.password.match(/.*[a-z].*/)) {
        res.status(400).send({err: 'password invalid. must have lowercase letters.'});
    }  else if(!req.body.password.match(/.*[0-9].*/)) {
        res.status(400).send({err: 'password invalid. must have digits.'});
    } else if(!req.body.username || !req.body.username.match(/[a-zA-Z0-9@\.]{6,}/)){
      res.status(400).send({err: 'username invalid. must be a string of length > 6'});
    } else {
      bcrypt.hash(req.body.password, 8, (err, hash) => {
        UserManipulator.addUser({username: req.body.username, hash: hash}, (err, user) => {
          if (err) {
            res.status(400).send({err: err});
          } else {
            delete user.password_hash;
            res.status(200).send(user);
          }
        });
      });
    }
  },

//todo return a session ID here so clients dont need to send username and password to server every time
  authenticate: (req, res) => {
    UserManipulator.getByUsername(req.body.username, (err, user) => {
      if (err !== null) {
        res.status(500).send(err);
      } else if (!user) {
        res.status(400).send({err: 'user does not exist'});
      } else {
        bcrypt.compare(req.body.password, user.password_hash, (err, result) => {
          if (result) { //passwords match
            delete user.password_hash;
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
