var express = require('express');
var url = require('url');
var querystring = require('querystring');
var router = express.Router();
var userDao = require('../dao/user-dao');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login',function(req,res,next){
    var user = {};
    user.username = req.body.username;
    user.password = req.body.password;
    userDao.findUser(function(result){
        if(!result || result.length == 0){
            res.send('用户不存在');
        }else{
            const  user = result[0];
            req.session.user = user;
            res.redirect(/mongo/);
        }
    },user);
});

router.get('/logout',function(req,res,next){
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
