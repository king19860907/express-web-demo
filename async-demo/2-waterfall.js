/**
 * 按顺序依次执行一组函数。每个函数产生的值，都将传给下一个。
 * 如果中途出错，后面的函数将不会被执行。错误信息将传给waterfall最终的callback。之前产生的结果被丢弃。
 * 该函数不支持json格式的tasks\
 * async.waterfall(tasks, [callback]);
 * Created by jun_ma on 2016/3/18.
 */

var async = require('async');
var util = require('./util');

async.waterfall([
    function(callback){
        callback(null,1);
    },
    function(data,callback){
        callback(null,data+2);
    },
    function(data,callback){
        callback(null,data+3);
    }
],function(err,results){
    console.log("1-"+results);
});

/**
 * 中途有函数出错，其err直接传给最终callback，结果被丢弃，后面的函数不再执行。
 */
async.waterfall([
    function(callback){
        callback(null,1);
    },
    function(data,callback){
        util.error('error',callback);
    },
    function(data,callback){
        callback(null,data+3);
    }
],function(err,results){
    console.error("2-"+err)
    console.log("2-"+results);
});