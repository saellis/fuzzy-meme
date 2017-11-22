var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var Route = new Schema({
  cityA: String, //the first city on the card, even though order doesnt matter
  cityB: String, //the second city
  points: Number // the point value of the route card
});

module.exports = Route;
