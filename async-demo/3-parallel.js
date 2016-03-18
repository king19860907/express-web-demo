/**
 * 并行执行多个函数，每个函数都是立即执行，不需要等待其它函数先执行。传给最终callback的数组中的数据按照tasks中声明的顺序，而不是执行完成的顺序。
 * tasks参数可以是一个数组或是json对象，和series函数一样，tasks参数类型不同，返回的results格式会不一样
 * Created by jun_ma on 2016/3/18.
 */

var async = require('async');
var util = require('./util');

/**
 * 并行执行多个函数，每个函数的值将按函数声明的先后顺序汇成一个数组，传给最终callback。
 */
async.parallel([
    function(callback){
        util.timeout(1,3000,callback);
    },
    function(callback){
        util.timeout(2,2000,callback);
    },
    function(callback){
        util.timeout(3,1000,callback);
    }
],function(err,results){
    console.log('1-'+results);
});

/**
 * 如果中途有个函数出错，则将该err和已经完成的函数值汇成一个数组，传给最终的callback。还没有执行完的函数的值将被忽略，但要在最终数组中占个位置
 * 输出[,,3]
 */
async.parallel([
    function(callback){
        util.timeout(1,3000,callback);
    },
    function(callback){
       util.error('error',callback,2000);
    },
    function(callback){
        util.timeout(3,1000,callback);
    }
],function(err,results){
    console.error('2-',err);
    console.log('2-'+results);
});

/**
 * 传入json，返回的也是json
 */
async.parallel({
    a:function(callback){
        util.timeout('a',3000,callback);
    },
    b:function(callback){
        util.timeout('b',2000,callback);
    },
    c:function(callback){
        util.timeout('c',1000,callback);
    }
},function(err,results){
    console.log('3-'+JSON.stringify(results));
});
