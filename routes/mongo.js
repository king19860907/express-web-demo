var express = require('express');
var router = express.Router();

var mongodb = require('mongodb');
var server = new mongodb.Server('10.1.6.210',27001,{auto_reconnect:true});
var db = new mongodb.Db('mydb',server,{safe:true});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mongo/index', { title: 'mongo' });
});

router.get('/insert', function(req, res, next) {
  db.open(function(err,db){
    if(!err){
      db.collection('mycollection',{safe:true},function(err,collection){
        if(err){
          console.log(err);
        }else{
          var data = {id:1,name:'majun',age:30};
          collection.insertOne(data,{safe:true},function(err,result){
            console.log(result);
          });
        }
      });
    }else{
      console.log(err);
    }
  });
  res.send('success');
});

router.get('/find',function(req,res,next){
  db.open(function(err,db){
    if(!err){
      db.collection('mycollection',{safe:true},function(err,collection){
        if(err){
          res.send(err);
        }else{
          collection.find().toArray(function(err,docs){
            res.send(docs);
          });
        }
      });
    }else{
      res.send(err);
    }
  });
});

module.exports = router;
