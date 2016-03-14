/**
 * Created by majun on 16-3-13.
 */
var mongodb = require('mongodb');

var server = new mongodb.Server(dbServer,dbport,{auto_reconnect:true});
var db = new mongodb.Db(dbName,server,{safe:true});

function saveUser(data){
    db.open(function(err,db){
        if(!err){
            db.collection(collectionName,{safe:true},function(err,collection){
                if(err){
                    console.log(err);
                }else{
                    collection.insertOne(data,{safe:true},function(err,result){
                        console.log(result);
                    });
                }
            });
        }else{
            console.log(err);
        }
    });
}

function findUser(func){
    db.open(function(err,db){
        if(!err){
            db.collection(collectionName,{safe:true},function(err,collection){
                if(err){
                    res.send(err);
                }else{
                    collection.find().toArray(function(err,docs){
                       func(docs);
                    });
                }
            });
        }else{
            res.send(err);
        }
    });
}

exports.saveUser = saveUser;
exports.findUser = findUser;