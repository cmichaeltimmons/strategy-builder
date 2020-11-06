'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const addon = require('bindings')('addon.node')
const path = require('path')

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Serve the client
app.use(express.static(path.join(__dirname, "./", "client/build")));
app.use(express.static("client/public"));

app.post('/api', (req, res) => {
  const result = addon.runGameSimulations(req.body.hero, req.body.villian)
  const total = result.heroWins+result.villianWins+result.ties+result.ties;
  console.log(result)
  res.json({
    hero: result.herWins,
    villian: result.villianWins
  })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);