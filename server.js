'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const addon = require('bindings')('addon.node')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/api', (req, res) => {
  const result = addon.runGameSimulations(req.body.hero, req.body.villian)
  const total = result.heroWins+result.villianWins+result.ties+result.ties;
  res.json({
    hero: result.herWins,
    villian: res.villianWins
  })
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);