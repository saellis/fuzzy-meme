var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

if (process.env.NODE_ENV !== "production") {
  require('dotenv').load();
}
const uri = process.env.MLAB_URI;
//mongoose's promise is deprecated so this is weird code that for some reason is necessitous
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true
});

var Game = new Schema({
  users: [String], //list of the game's players' IDs
  creator: String, //ID of player who created the game
  currentPlayer: String //ID of player whose turn it currently is
});

module.exports = mongoose.model('Game', Game);
