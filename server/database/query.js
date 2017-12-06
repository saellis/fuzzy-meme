const { Client } = require('pg');
import to from 'await-to-js';

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  require('dotenv').load();
}

var query = async function(text, values) {
  var client = new Client();
  client.connect();
  var err, result;
  [err, result] = await to(client.query(text, values));
  client.end();
  return [err,result];
};

var transact = async function(queries) {
  var client = new Client();
  await client.connect();
  try {
    await client.query('BEGIN');
    for(var i = 0; i < queries.length; i ++) {
      var [err, res] = await to(client.query(queries[i].sql, queries[i].values))
      if (err) {
        throw err;
      }
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK')
    throw e;
  } finally {
    await client.end();
  }
};


export {query, transact};
