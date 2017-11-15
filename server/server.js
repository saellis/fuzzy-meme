const express = require("express");
const app = express();
const mongo = require('./mongo');
const bodyParser = require('body-parser');

app.set("port", process.env.PORT || 3001);





// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  require('dotenv').load();
}

app.get("/", (req, res) => {
  //console.log(process.env.MLAB_URI);
  res.sendStatus(200);
});

app.post("/games", (req, res) => {
  mongo.createGame((result) => {
    console.log(result);
    res.send(result);
  })
});

var server = app.listen(3001, function () {
  var port = server.address().port;
  console.log('Example app listening at port %s', port);
});

module.exports = app;
