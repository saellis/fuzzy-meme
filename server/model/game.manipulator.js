const uuid = require('uuid/v4');
import query from '../database/query';

var gameManipulator = {

  createGame: async (creatorId) => {
      var id = uuid();
      var sql = 'INSERT INTO games VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;';
      var values = [id, creatorId, creatorId, false, "{" + creatorId + "}", {}, {}, {}, {}, {}];

      var [err, result] = await query(sql, values);
      if(err) {
        throw new Error(err);
      } else {
        sql = 'INSERT INTO game_players VALUES($1, $2, $3, $4);';
        values = [id, creatorId, {}, {}];
        var res;
        [err, res] = await query(sql, values);
        if(err) {
          throw new Error(err);
        } else {
          return result.rows[0];
        }
      }
  },

  getGame: async (gameId, callback) => {
    var sql = 'SELECT * FROM games WHERE _id = $1;';
    var values = [gameId];
    var [err, res] = await query(sql, values);
    if(err) {
      throw new Error(err);
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
          throw new Error(err);
        } else if (res.rows.length === 0) {
          return [];
          //callback(err, []);
        } else {
          var ids = '{';
          res.rows.forEach((gameObj) => {
            ids += gameObj.game_id + ',';
          });
          sql = 'select * from games where _id = ANY($1::text[]);';
          values = [ids.slice(0, -1) + '}'];
          [err, res] = await query(sql, values);
            if(err !== null) {
              throw new Error(err);
            }
            else {
              return res.rows;
            }
        }
    }

  }
};

module.exports = gameManipulator;
