/*
 *  BE CAREFUL EXECUTING THIS!
 *  Executing this will drop all data from the database and reinitialize it.
 *  All game and user info will be lost and an old copy would
 *  have to be recovered from AWS to get _any_ data back.
 *  Safe to say, this should only happen after major DB schema changes
 *  or integration tests.
 *
 * Also note, this script must be run from the root directory of the repository.
 */
const fs = require('fs');
const uuid = require('uuid/v4');
import query from './query';
const colors = require('./static/colors');

(async function() {
  var schema = fs.readFileSync(__dirname + '/schema.sql', 'utf8');
  var [err, result] = await query(schema, []);
  if (err) console.log(err);
  else console.log('Dropped and reinserted all tables');
  var tickets = JSON.parse(fs.readFileSync(__dirname + '/static/tickets.json', 'utf8'));
  tickets.map(await insertTicket);
  console.log('Inserted tickets to DB');

  var paths = JSON.parse(fs.readFileSync(__dirname + '/static/routes.json', 'utf8'));
  paths.map(await insertPath);
  console.log('Inserted paths to DB');
})();

var insertPath = async (path) => {
  var sql = 'insert into paths (cityA, cityB, color, length) values ($1, $2, $3, $4);';
  var values = [path.cities[0], path.cities[1], path.color.toUpperCase(), path.length];
  var [err, res] = await query(sql, values);
  if (err) {
    console.log(err);
  }
};

var insertTicket = async (card) => {
  card.points = parseInt(card.points);
  var sql = 'insert into tickets (cityA, cityB, points) values($1, $2, $3);';
  var values = [card.cityA, card.cityB, card.points];
  var [err, res] = await query(sql, values);
  if(err) {
    console.log(err);
  }
};
