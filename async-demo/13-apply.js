/**
 * apply是一个非常好用的函数，可以让我们给一个函数预绑定多个参数并生成一个可直接调用的新函数，简化代码。
 * function(callback) { t.inc(3, callback); }
 * 等价于：
 * async.apply(t.inc, 3);
 * apply(function, arguments..)
 * Created by jun_ma on 2016/3/24.
 */

var async = require('async');

function inc(a,b,timeout,callback){
    var timeout = timeout || 300;
    setTimeout(function(){
        callback(null,a+b);
    },timeout);
}

var fn = async.apply(inc,1,2,5000);

fn(function(err,result){
    console.log('fn-error:'+err);
    console.log('fn-result:'+result);
});

//或者
var fn2 = async.apply(inc,1,2);
fn2(1000,function(err,result){
    console.log('fn2-error:'+err);
    console.log('fn2-result:'+result);
});