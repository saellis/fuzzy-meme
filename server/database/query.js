const { Client } = require('pg');

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
