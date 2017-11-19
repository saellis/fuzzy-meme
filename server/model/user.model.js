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

var User = new Schema({
  username: { type : String , unique : true, required : true, dropDups: true }, // the player's username
  password: String, // hell yeah plaintext
  games: [String] // list IDs of the games this user belongs to
});

module.exports = mongoose.model('User', User);
