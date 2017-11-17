const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

const game = require('./controller/gameController');
const user = require('./controller/userController');

app.set("port", process.env.PORT || 3001);
// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  require('dotenv').load();
}


app.route('/')
  .get((req, res) => res.sendStatus(200));

app.route('/games')
  .get(game.get);

app.route('/games/create')
  .post(game.create)

app.route('/users/create')
  .post(user.create);



var server = app.listen(3001, function () {
  var port = server.address().port;
});

module.exports = {app: app, server: server};
