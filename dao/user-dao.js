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

function findUser(func,params){
    db.open(function(err,db){
        if(!err){
            db.collection(collectionName,{safe:true},function(err,collection){
                if(err){
                    res.send(err);
                }else{
                    collection.find(params).toArray(function(err,docs){
                       func(docs);
                    });
                }
            });
        }else{
            res.send(err);
        }
    });
}

/**
 * 根据id查询单条记录
 * @param id
 * @param func
 */
function findUserById(id,func){
    console.log(id);
    db.open(function(err,db){
        if(!err){
            db.collection(collectionName,{safe:true},function(err,collection){
                if(err){
                    res.send(err);
                }else{
                    var objectId = mongodb.ObjectID;
                    collection.find({_id:objectId(id)}).toArray(function(err,docs){
                        db.close();
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
exports.findUserById = findUserById;