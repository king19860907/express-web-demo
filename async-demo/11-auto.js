/**
 * auto用来处理有依赖关系的多个任务的执行。
 * 比如某些任务之间彼此独立，可以并行执行；但某些任务依赖于其它某些任务，只能等那些任务完成后才能执行。
 * 虽然我们可以使用parallel和series结合起来实现该功能，但如果任务之间关系复杂，则代码会相当复杂，以后如果想添加一个新任务，也会很麻烦。
 * 这时使用auto，则会事半功倍。
 *
 * 如果有任务中途出错，则会把该错误传给最终callback，所有任务（包括已经执行完的）产生的数据将被忽略。
 * 如果不关心错误和最终数据，可以不用写最后那个callback。
 *
 * async.auto(tasks, [callback])
 * Created by jun_ma on 2016/3/24.
 */

var async = require('async');

/**
 * 一个程序，它要完成以下几件事：
 * 1. 从某处取得数据
 * 2. 在硬盘上建立一个新的目录
 * 3. 将数据写入到目录下某文件
 * 4. 发送邮件，将文件以附件形式发送给其它人。
 *
 * 分析该任务，可以知道1与2可以并行执行，3需要等1和2完成，4要等3完成。
 * 可以按以下方式来使用auto函数。
 */
async.auto({
    getData:function(callback){
        setTimeout(function(){
            console.log('1-getData');
            callback(null,'1-myData');
        },1000);
    },
    makeFolder:function(callback){
        setTimeout(function(){
            console.log('1-mackeFolder');
            callback(null,'1-myFolder');
        },1000);
    },
    writeFile:['getData','makeFolder',function(callback){
        setTimeout(function(){
            console.log('1-writeFile');
            callback(null,'1-myFile');
        },1000);
    }],
    emailFiles:['writeFile',function(callback,result){
        setTimeout(function(){
            console.log('1-emailFiles:',result.writeFile);
            callback(null,'1-myEmailFile');
        },1000);
    }],
},function(err,result){
    console.log('1-error:'+err);
    console.log('1-result:'+JSON.stringify(result));
});


/**
 * 如果中途出错，则会把错误交给最终callback，执行完任务的传给最终callback。未执行完成的函数值被忽略
 */
async.auto({
    getData:function(callback){
        setTimeout(function(){
            console.log('2-getData');
            callback(null,'2-myData');
        },1000);
    },
    makeFolder:function(callback){
        setTimeout(function(){
            console.log('2-mackeFolder');
            callback(null,'2-myFolder');
        },1000);
    },
    writeFile:['getData','makeFolder',function(callback){
       /* setTimeout(function(){
            console.log('2-writeFile');
            callback(null,'2-myFile');
        },1000);*/
        callback('my-error');
    }],
    emailFiles:['writeFile',function(callback,result){
        setTimeout(function(){
            console.log('2-emailFiles:',result.writeFile);
            callback(null,'2-myEmailFile');
        },1000);
    }],
},function(err,result){
    console.log('2-error:'+err);
    console.log('2-result:'+JSON.stringify(result));
});