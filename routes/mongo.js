var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');

global.dbServer = '192.168.99.100';
global.dbName = 'mydb';
global.collectionName = 'user';
global.dbport = 32768;

var userDao = require('../dao/user-dao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mongo/index', { title: 'mongo' });
});

router.get('/insert', function(req, res, next) {
  res.render('mongo/insert');
});

router.get('/save',function(req, res, next){
  var paramStr = url.parse(req.url).query;
  var data = querystring.parse(paramStr);
  userDao.saveUser(data);
  res.send('success');
});

router.get('/find',function(req,res,next){
  userDao.findUser(function(result){
    res.render('mongo/find',{result:result});
  });
});

module.exports = router;
