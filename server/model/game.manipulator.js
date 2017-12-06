const uuid = require('uuid/v4');
import {query, transact} from '../database/query';
import to from 'await-to-js';

var gameManipulator = {

  createGame: async (creatorId, name) => {
    var queries = [];
    var id = uuid();
    var sql = 'INSERT INTO games VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;';
    var values = [id, name, creatorId, creatorId, false, {}, {}, {}, {}, {}];
    queries.push({sql: sql, values: values});
    sql = 'INSERT INTO game_players VALUES($1, $2, $3, $4);';
    values = [id, creatorId, {}, {}];
    queries.push({sql: sql, values: values});
    var [err, res] = await to(transact(queries));
    if (err) {
      throw err;
    } else {
      var sql = 'SELECT * FROM games WHERE _id = $1;';
      var values = [id];
      var [err, res] = await query(sql, values);
      if(err) {
        throw err;
      } else {
        return res.rows[0];
      }
    }
  },

  getGame: async (gameId) => {
    var sql = 'SELECT * FROM games WHERE _id = $1;';
    var values = [gameId];
    var [err, res] = await query(sql, values);
    if(err) {
      throw err;
    }
    return res.rows[0];
  },

  getGamesForUser: async (userId) => {
    var sql = 'SELECT * FROM users WHERE _id = $1;';
    var values = [userId];

    var [err, res] = await query(sql, values);

    if(res.rows.length === 0) {
      throw new Error('userId does not exist');
    } else {
      sql = 'SELECT game_id FROM game_players WHERE user_id = $1;';
      values = [userId];
      [err,res] = await query(sql, values);
        if(err !== null) {
          throw err;
        } else if (res.rows.length === 0) {
          return [];
        } else {
          var ids = '{';
          res.rows.forEach((gameObj) => {
            ids += gameObj.game_id + ',';
          });
          sql = 'select * from games where _id = ANY($1::text[]);';
          values = [ids.slice(0, -1) + '}'];
          [err, res] = await query(sql, values);
            if(err !== null) {
              throw err;
            }
            else {
              return res.rows;
            }
        }
    }

  }
};

module.exports = gameManipulator;
