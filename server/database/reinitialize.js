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
const pg = require('./query');
const colors = require('./static/colors');

var sql = 'select \'drop table if exists "\' || tablename || \'" cascade;\' as stmt from pg_tables where schemaname = \'public\';';

pg.query(sql, [], (err, result) => {
  result.rows.map((row) => {
    pg.query(row.stmt, [], (err, result) => {
      if (err) console.log(err);
      console.log(row.stmt);
    });
  });

  var schema = fs.readFileSync(__dirname + '/schema.sql', 'utf8');
  pg.query(schema, [], (err, result) => {
    if (err) console.log(err);

    var tickets = JSON.parse(fs.readFileSync(__dirname + '/static/tickets.json', 'utf8'));
    tickets.map((card) => {
      card.points = parseInt(card.points);
      var sql = 'insert into tickets (cityA, cityB, points) values($1, $2, $3);';
      var values = [card.cityA, card.cityB, card.points];
      pg.query(sql, values, (err, res) => {
        if(err) {
          console.log(err);
        }
      });
    });
    console.log('Inserted tickets to DB');

    var paths = JSON.parse(fs.readFileSync(__dirname + '/static/routes.json', 'utf8'));
    paths.map((path) => {
      var sql = 'insert into paths (cityA, cityB, color, length) values ($1, $2, $3, $4);';
      var values = [path.cities[0], path.cities[1], path.color.toUpperCase(), path.length];
      pg.query(sql, values, (err, res) => {
        if (err) {
          console.log(err);
        }
      });
    });
    console.log('Inserted paths to DB');
  });
});
