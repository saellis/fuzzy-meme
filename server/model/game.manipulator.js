const { Client } = require('pg')
const uuid = require('uuid/v4');

var gameManipulator = {

  createGame: (creatorId, callback) => {
      const client = new Client();
      client.connect();
      var id = uuid();
      var sql = 'INSERT INTO games VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;';
      var values = [id, creatorId, creatorId, false, "{" + creatorId + "}", {}, {}, {}, {}, {}];

      client.query(sql, values, (err, result) => {
        if(err) {
          console.log(err);
          callback(err);
        } else {
          sql = 'INSERT INTO game_players VALUES($1, $2);';
          values = [id, creatorId];
          client.query(sql, values, (err, res) => {
            if(err) {
              console.log(err);
              callback(err);
            } else {
              callback(err, result.rows[0]);
            }
            client.end();
          });
        }
      });
  },

  getGame: (gameId, callback) => {
    const client = new Client();
    client.connect();
    var sql = 'SELECT * FROM games WHERE _id = $1;';
    var values = [gameId];
    client.query(sql, values, (err, res) => {
      if(err !== null) {
        console.log(err);
        callback(err);
      } else {
        callback(err, res.rows[0]);
      }
      client.end();
    });
  }
}

module.exports = gameManipulator;
