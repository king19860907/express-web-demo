var express = require('express');
var router = express.Router();
var url = require('url');
var querystring = require('querystring');



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
    //console.log(result);
    //console.log(result[0]);
    //console.log(result[0].id);
    console.log(result);
    res.render('mongo/find',{result:result});
  });
});

module.exports = router;
