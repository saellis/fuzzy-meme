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

var sql = 'select \'drop table if exists "\' || tablename || \'" cascade;\' as stmt from pg_tables where schemaname = \'public\';';

pg.query(sql, [], (err, result) => {
  result.rows.map((row) => {
    pg.query(row.stmt, [], (err, result) => {
      if (err) console.log(err);
      console.log(row.stmt);
    });
  });

  fs.readFile(__dirname + '/schema.sql', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    pg.query(data, [], (err, result) => {
      if (err) console.log(err);
      //now init route cards into db
      var routeCards = JSON.parse(fs.readFileSync(__dirname + '/static/tickets.json', 'utf8'));
      routeCards.map((card) => {
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
    });
  });
});
