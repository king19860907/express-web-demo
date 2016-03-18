/**
 * series
 * 它的作用是串行执行，一个函数数组中的每个函数，每一个函数执行完成之后才能执行下一个函数
 * series函数的第一个参数可以是一个数组也可以是一个JSON对象，参数类型不同，影响的是返回数据的格式
 * 如果任何一个函数向它的回调函数中传了一个error，则后面的函数都不会被执行，并且会立刻将该error以及已经执行了的函数的结果，传给series中最后那个callback。
 * 当所有的函数执行完后（没有出错），则会把每个函数传给其回调函数的结果合并为一个数组，传给series最后的那个callback。
 * Created by jun_ma on 2016/3/18.
 */

var async = require('async');
var util = require('./util');

/**
 * 参数为json格式，则返回也是json格式
 * 每个函数需传入一个callback回调函数，这个回调用于将回调的结果合并为一个数组，然后在传入最后的callback的结果
 * callback回调函数接受两个参数
 * 第一个为错误信息，如果没有错误就填入null
 * 第二个为需要传递的结果数据
 */
async.series({
    one : function(callback){
        util.msg(1,callback);
    },
    two: function(callback){
        util.msg(2,callback);
    }
},function(err,results){
    console.log(results);
});

/**
 * 参数为数组则返回也为数组
 */
async.series([
    function(callback){
        util.msg(1,callback);
    },
    function(callback){
        util.msg(2,callback);
    }
],function(err,results){
    console.log(results);
});

/**
 * 如果中间有函数出错了，则出错之后的函数不会执行，错误之前的函数会将结果传给最终的callback
 */
async.series({
    one : function(callback){
        util.msg(1,callback);
    },
    two: function(callback){
        util.error('err-msg',callback);
    },
    three: function(callback){
        util.msg(3,callback);
    }
},function(err,results){
    console.error(err);
    console.log(results);
});

/**
 * 如果某个函数传的数据是undefined, null, {}, []等，它们会原样传给最终callback。
 */
async.series({
    one : function(callback){
        util.msg(undefined,callback);
    },
    two: function(callback){
        util.msg(null,callback);
    },
    three: function(callback){
        util.msg({name:'majun',id:1},callback);
    },
    four: function(callback){
        util.msg(4,callback);
    }
},function(err,results){
    console.log(results);
});
