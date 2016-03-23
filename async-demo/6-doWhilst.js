/**
 * doWhilst交换了fn,test的参数位置，先执行一次循环，再做test判断。
 * doWhilst(fn, test, callback)
 * Created by jun_ma on 2016/3/23.
 */

var async = require('async');

var count = 2;
async.doWhilst(function(callback){
    console.log(count);
    count++;
    setTimeout(callback,1000);
},function(){
    console.log('test');
    return count < 3;
},function(error){
    console.log('error:'+error);
})