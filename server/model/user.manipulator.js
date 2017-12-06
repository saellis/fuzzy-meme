const uuid = require('uuid/v4');
import {query} from '../database/query';
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
}

module.exports = userManipulator;
