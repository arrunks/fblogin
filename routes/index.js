var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* GET home page. */
router.get('/:leadId', function(req, res, next) {
  res.sendFile('index.html',{ root: path.join(__dirname, '../public')});
});

module.exports = router;
