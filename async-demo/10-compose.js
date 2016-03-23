/**
 * 创建一个包括一组异步函数的函数集合，每个函数会消费上一次函数的返回值。
 * 把f(),g(),h()异步函数，组合成f(g(h()))的形式，通过callback得到返回值。
 * compose(fn1, fn2...)
 * Created by jun_ma on 2016/3/23.
 */

var async = require('async');

/**
 * 通过compose组合，f(g(h()))的形式，从内层到外层的执行的顺序。
 */
function f(n,callback){
    console.log('f:'+n);
    setTimeout(function(){
        callback(null,n+1);
    },1000);
}

function g(n,callback){
    console.log('g:'+n);
    setTimeout(function(){
        callback(null,n*2);
    },1000);
}

function h(n,callback){
    console.log('h:'+n);
    setTimeout(function(){
        callback(null,n-10);
    },1000);
}

var fgh = async.compose(f,g,h);
fgh(4,function(err,result){
    console.log('result:'+result);
})