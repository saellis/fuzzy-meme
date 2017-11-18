const User = require('../model/User');

var controller = {

  create: (req, res) => {
    var user = new User({
      username: req.body.username,
      password: req.body.password,
      games: []
    });
    user.save((err, result) => {
      if(err) {
        console.log(err)
        res.sendStatus(500);
      }
      res.status(200).send(result);
    });
  }

};

module.exports = controller;
