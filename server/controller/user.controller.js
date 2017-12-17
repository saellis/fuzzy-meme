const UserManipulator = require('../model/user.manipulator');
import bcrypt from 'bcrypt';
import to from 'await-to-js';

var controller = {

  create: async (req, res) => {
    if(!req.body.password || !req.body.password.match(/.{8,}/)) {
        res.status(400).send({err: 'password invalid. must be a string of length >= 8'});
    } else if(!req.body.password.match(/.*[A-Z].*/)) {
        res.status(400).send({err: 'password invalid. must have capital letters.'});
    } else if(!req.body.password.match(/.*[a-z].*/)) {
        res.status(400).send({err: 'password invalid. must have lowercase letters.'});
    } else if(!req.body.password.match(/.*[0-9].*/)) {
        res.status(400).send({err: 'password invalid. must have digits.'});
    } else if(!req.body.username || !req.body.username.match(/[a-zA-Z0-9@\.]{6,}/)) {
        res.status(400).send({err: 'username invalid. must be a string of length > 6'});
    } else {
      await bcrypt.hash(req.body.password, 8).then(async (hash) => {
        var [err, user] = await to(UserManipulator.addUser({username: req.body.username, hash: hash}));
        if (err) {
          if(err.code === '23505') {
            res.status(400).send({err: 'username already exists'});
          } else {
            res.status(400).send({err: err.message});
          }
        } else {
          delete user.password_hash;
          res.status(200).send(user);
        }
      }).catch((err) => {
        // an error occured in bcrypt while hashing password
        console.log(err);
        res.status(400).send(err);
      });
    }
  },

  doesUserExist: async (userId) => {
    var [err, result] = await to(UserManipulator.getByUserId(userId));
    return result.length !== 0;
  },

//todo return a session ID here so clients dont need to send username and password to server every time
  authenticate: async (req, res) => {
    var [err, user] = await to(UserManipulator.getByUsername(req.body.username));
    if (err !== null) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(400).send({err: 'user does not exist'});
    } else {
      await bcrypt.compare(req.body.password, user.password_hash).then((result) => {
        if (result) { //passwords match
          delete user.password_hash;
          res.status(200).send(user);
        } else { //passwords dont match
          res.status(400).send({err: 'incorrect password'});
        }
      }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
    }
  },

  list: async (req, res) => {
    var [err, users] = await to(UserManipulator.getUsers());
    if (err !== null) {
      res.status(500).send(err);
    }
    else if (!users) {
      res.status(400).send({err: 'users error'});
    } else {
      res.status(200).send(users);
    }
  },

  invite: async (req, res) => {
    var [err, invites] = await to(UserManipulator.newInvites(req.body.inviteIds, req.body.inviterId, req.body.gameId));

    if (err !== null) {
      //console.log(err)
      res.status(500).send(err);
    }
    else if (!invites) {
      res.status(400).send({err: 'invites error'});
    } else {
      res.status(200).send({text: 'successfully invited'});
    }
  }
};

module.exports = controller;
