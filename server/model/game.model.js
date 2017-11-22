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
  currentPlayer: String, //ID of player whose turn it currently is
  currentPlayerActedOnce: Boolean, //has the player made one action so far? (useful for pulling two cards, returning pathcards, etc.)
  faceUp: [String], //the five face up cards available to the current user
  faceDown: [String], // the stack of face down cards that the user can pull from
  discard: [String] // the pile of cards that were played to build track
});

module.exports = mongoose.model('Game', Game);
