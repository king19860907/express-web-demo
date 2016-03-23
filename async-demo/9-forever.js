/**
 * forever，无论条件循环执行，如果不出错，callback永远不被执行
 * forever(fn, callback)
 * Created by jun_ma on 2016/3/23.
 */

var async = require('async');
var util = require('./util');
var count = 0;

async.forever(function(callback){
    console.log(count);
    if(count > 10){
        util.error('error',callback);
    }else{
        count++;
        setTimeout(callback,1000);
    }
},function(err){
    console.log('error:'+err);
});