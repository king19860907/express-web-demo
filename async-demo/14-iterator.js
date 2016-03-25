/**
 * 将一组函数包装成为一个iterator，初次调用此iterator时，会执行定义中的第一个函数并返回第二个函数以供调用。
 * 也可通过手动调用 next() 得到以下一个函数为起点的新的iterator。
 * 该函数通常由async在内部使用，但如果需要时，也可在我们的代码中使用它。
 * Created by jun_ma on 2016/3/24.
 */

var async = require('async');

var iter = async.iterator([
    function (){
        console.log('111');
    },
    function (){
        console.log('222');
    },
    function (){
        console.log('333');
    }
]);

/**
 * 直接调用iter()，会执行当前函数，并返回一个由下个函数为起点的新的iterator
 */
var it1 = iter();
it1();
it1();
console.log('----------------------------------');
var it2  = iter();
var it3 = it2();
var it4 = it3();
//it4();
console.log('----------------------------------');

/**
 *  调用next(),不会执行当前函数，直接返回由下个函数为起点的新iterator
 *  对于同一个iterator,多次调用next(),不会影响自己
 */
var it5 = iter.next();
it5();
var it6 = iter.next().next();
it6();
var it7 = it5.next();
it7();
iter();