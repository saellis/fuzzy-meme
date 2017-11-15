const mongoose = require('mongoose');
const uuid = require('uuid/v1');

if (process.env.NODE_ENV !== "production") {
  require('dotenv').load();
}
const uri = process.env.MLAB_URI;
console.log(uri);
mongoose.connect(uri);

var GameSchema = mongoose.Schema({
  id: String
});

var Game = mongoose.model('Game', GameSchema);

var mongo = {
  createGame: (callback) => {
    var gameId = uuid();
    var newGame = new Game({
      id: gameId
    });
    newGame.save((err, newGame) => {
      if (err) {
        console.log('Error creating new game');
        callback({success: false});
      } else {
        console.log('Successfully created a new game');
        callback({success: true, id: gameId});
      }
    });
  }

}

module.exports = mongo;
