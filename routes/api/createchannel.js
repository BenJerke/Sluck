//route for creating a new channel
const express = require ('express');
const router = express.Router();
const channelController

router.get('/', function(req, res, next) {
    res.render('hey this worked');
  });
  
  router.get('/another/route', function(req, res, next) {
    res.json({ hello: 'world' });
  });
  
  module.exports = router;