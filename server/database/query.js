const { Client } = require('pg');
import to from 'await-to-js';

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  require('dotenv').load();
}

export default async function(text, values, cb){
     var client = new Client();
     client.connect();
     var err, result;
     [err, result] = await to(client.query(text, values));
     client.end();
     return [err,result];
}
