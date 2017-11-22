var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var Route = require('./route.schema')

if (process.env.NODE_ENV !== "production") {
  require('dotenv').load();
}
const uri = process.env.MLAB_URI;
//mongoose's promise is deprecated so this is weird code that for some reason is necessitous
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
  useMongoClient: true
});

var User = new Schema({
  username: { type : String , unique : true, required : true, dropDups: true }, // the player's username
  password: String, // hell yeah plaintext
  games: [String], // list IDs of the games this user belongs to
  trainHand: [String], //list of all of the train cards the user has in their hand
  routeHand: [Route] //list of route cards that the user has in their hand
});

module.exports = mongoose.model('User', User);
