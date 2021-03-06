/**
 * until与whilst正好相反，当test为false时循环，与true时跳出。其它特性一致。
 * Created by jun_ma on 2016/3/23.
 */
var async = require('async');
var count = 0;

async.until(function(){
    return count > 3;
},function(callback){
    console.log(count);
    count++;
    setTimeout(callback,1000);
},function(err){
    console.log('error:'+err);
})