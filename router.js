var express = require('express');
var router = express.Router();
var pug = require('pug');

// @TODO load from DB
var title = 'example'

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  res.render('index', {page_title: title});
});

module.exports = router;