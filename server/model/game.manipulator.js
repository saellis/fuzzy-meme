const { Client } = require('pg')
const uuid = require('uuid/v4');
const pg = require('../database/query');

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
          sql = 'INSERT INTO game_players VALUES($1, $2, $3, $4);';
          values = [id, creatorId, {}, {}];
          client.query(sql, values, (err, res) => {
            if(err) {
              console.log(err);
              client.end();
              callback(err);
            } else {
              client.end();
              callback(err, result.rows[0]);
            }
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
  },

  getGamesForUser: (userId, callback) => {
    var sql = 'SELECT * FROM users WHERE _id = $1;';
    var values = [userId];
    pg.query(sql, values, (err, res) => {
      if(res.rows.length === 0) {
        callback({'err': 'userId does not exist'});
      } else {
        sql = 'SELECT game_id FROM game_players WHERE user_id = $1;';
        values = [userId];
        pg.query(sql, values, (err, res) => {
          if(err !== null) {
            console.log(err);
            callback(err);
          } else if (res.rows.length === 0) {
            callback(err, []);
          } else {
            var ids = '{';
            res.rows.forEach((gameObj) => {
              ids += gameObj.game_id + ',';
            });
            sql = 'select * from games where _id = ANY($1::text[]);';
            values = [ids.slice(0, -1) + '}'];
            pg.query(sql, values, (err, res) => {
              if(err !== null) {
                console.log(err);
                callback(err);
              }
              else {
                callback(err, res.rows);
              }
            });
          }
        });
      }
    });
  }
};

module.exports = gameManipulator;
