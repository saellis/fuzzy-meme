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
  client.connect();
  try {
    await to(client.query('BEGIN'));
    queries.forEach(async query => {
      await client.query(query.sql, query.values);
    });
    client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};


export {query, transact};
