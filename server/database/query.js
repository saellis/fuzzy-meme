const { Client } = require('pg');

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  require('dotenv').load();
}

module.exports = {
   query: function(text, values, cb) {
     var client = new Client();
     client.connect();
     client.query(text, values, function(err, result) {
          cb(err, result);
          client.end();
     });
    }
}
