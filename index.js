'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))
app.get("/", function (req, res) {
  res.sendFile("/index.html", {root: __dirname + '/public/'});
});

app.use("/", require('./routes/notesRoutes.js'));
app.use("/notes", require('./routes/notesRoutes.js'));

let port = 3000;
const hostname = "localhost";

app.listen(port, hostname, () => {
  console.log(`Listening on host http://${hostname}:${port}/`);
});
