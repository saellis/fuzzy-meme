const { Client } = require('pg')
const uuid = require('uuid/v4');

var userManipulator = {
  addUser: (user, callback) => {
      const client = new Client();
      client.connect();
      var id = uuid();
      var sql = 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING *;';
      var values = [id, user.username, user.hash, {}, {}, {}];
      client.query(sql, values, (err, res) => {
        if(err) {
          if(err.code === '23505') {
            callback('username already exists');
          } else {
            callback(err);
          }
        } else {
          callback(err, res.rows[0]);
        }
        client.end();
      });
  },

  getByUsername: (username, callback) => {
    const client = new Client();
    client.connect();
    var sql = 'SELECT * FROM users WHERE username = $1;';
    var values = [username];
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

module.exports = userManipulator;
