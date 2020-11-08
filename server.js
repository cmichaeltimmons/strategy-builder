'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const addon = require('bindings')('addon.node')
const path = require('path');

// Constants
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const ranges = require('./models/dbHelpers')

app.post('/api/ranges', (req, res) => {
  ranges.addRange(req.body)
  .then(range => {
    res.status(200).json(range)
  })
  .catch(error => {
    res.status(500).json({message: "cannot add range"})
  })
})

app.get('/api/ranges', (req, res) => {
  ranges.getRanges()
  .then(ranges => {
    res.status(200).json(ranges)
  })
  .catch(error => {
    res.status(500).json({message: "Unable to retrieve ranges"})
  })
})

// run simulations
app.post('/api/run-simulations', (req, res) => {
  const result = addon.runGameSimulations(req.body.hero, req.body.villian)
  res.json({
    hero: result.heroWins,
    villian: result.villianWins
  })
});

// Serve the client
app.use(express.static(path.join(__dirname, "./", "client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);