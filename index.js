const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));
app.use(bodyParser.json());

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

app.get("/", function (req, res) {
  res.sendFile("/html/index.html", {root: __dirname + '/public/'});
});

app.use("/", require('./routes/notesRoutes.js'));

const hostname = 'localhost';
const port = 3000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});