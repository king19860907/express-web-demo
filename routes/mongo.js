var express = require('express');
var router = express.Router();



var userDao = require('../dao/user-dao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mongo/index', { title: 'mongo' });
});

router.get('/insert', function(req, res, next) {
  var user = {};
  user.name = 'majun2';
  user.age = 31;
  user.id = 2;
  userDao.saveUser(user);
  res.send('success');
});

router.get('/find',function(req,res,next){
  userDao.findUser(function(result){
    console.log(result);
    console.log(result[0]);
    console.log(result[0].id);
    res.send(result[0].age+'');
  });
});

module.exports = router;
