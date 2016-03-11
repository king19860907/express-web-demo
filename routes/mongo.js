var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mongo/index', { title: 'mongo' });
});

module.exports = router;
