const uuid = require('uuid/v4');
import {query, transact} from '../database/query';
import to from 'await-to-js';

var userManipulator = {
  addUser: async (user, callback) => {
      var id = uuid();
      var sql = 'INSERT INTO users VALUES($1, $2, $3) RETURNING *;';
      var values = [id, user.username, user.hash];
      var [err, res] = await query(sql, values);
      if(err) {
        throw err;
      } else {
        return res.rows[0];
      }
  },

  getUsers: async () => {
    var sql = 'select * from users where username not like \'%-%-%-%-%\'';
    var [err, res] = await query(sql, []);
    if(err !== null) {
      throw err;
    } else {
      return res.rows;
    }
  },

  getByUserId: async (userId) => {
    var sql = 'SELECT * FROM users WHERE _id = $1;';
    var [err, res] = await query(sql, [userId]);
    if(err !== null) {
      throw err;
    } else {
      return res.rows;
    }
  },

  getByUsername: async (userName) => {
    var sql = 'SELECT * FROM users WHERE username = $1;';
    var [err, res] = await query(sql, [userName]);
    if(err !== null) {
      throw err;
    } else {
      return res.rows[0];
    }
  },

  newInvites: async (inviteIds, inviterId, game_id) => {
    var sql = 'INSERT INTO game_invites (game_id, user_id, inviter_id, status) VALUES($1, $2, $3, \'P\')';
    var queries = inviteIds.map((inviteId) => {
      return {sql, values: [game_id, inviteId, inviterId]};
    });
    var [err, res] = await to(transact(queries));
    if (err) {
      throw err;
    } else {
        return true;
    }
  }
}

module.exports = userManipulator;
