/**
 * queue是一个串行的消息队列，通过限制了worker数量，不再一次性全部执行。
 * 当worker数量不够用时，新加入的任务将会排队等候，直到有新的worker可用。
 * 该函数有多个点可供回调，如worker用完时、无等候任务时、全部执行完时等。
 * queue(worker, concurrency)
 * Created by jun_ma on 2016/3/24.
 */

var async = require('async');
var util = require('./util');

/**
 * 定义一个queue，设置worker数量为2
 */
var q = async.queue(function(task,callback){
    console.log('worker is process task: '+task.name);
    task.run(callback);
},2);

/**
 *  监听：如何某次push操作后，任务数将达到或超过worker数量时，将调用该函数
 */
q.saturated = function(){
    console.log('all workers to be used');
};

/**
 *  监听：当最后一个任务交给worker时，调用该函数
 */
q.empty = function(){
    console.log('no more tasks wating')
};

/**
 *  监听：当所有任务都执行完成以后，将调用该函数
 */
q.drain = function(){
    console.log('all tasks have been processed');
};

/**
 *  独立加入2个任务
 */
q.push({
    name:'t1',
    run:function(callback){
        console.log('t1 is running, waiting tasks: ', q.length());
        util.timeout('t1',1000,callback);
    },
},function(err){
    console.log('t1 executed: '+err);
});
console.log('pushed t1, waiting tasks: ', q.length());

q.push({
    name:'t2',
    run:function(callback){
        console.log('t2 is running, waiting tasks: ', q.length());
        util.timeout('t2',500,callback);
    },
},function(err){
    console.log('t2 executed: '+err);
});
console.log('pushed t2, waiting tasks: ', q.length());

/**
 * 同时加入多个任务
 */
q.push([
    {
        name:'t3',
        run:function(callback){
            console.log('t3 is running, waiting tasks: ', q.length());
            util.timeout('t3',3000,callback);
        }
    },
    {
        name:'t4',
        run:function(callback){
            console.log('t4 is running, waiting tasks: ', q.length());
            util.timeout('t4',5000,callback);
        }
    },
    {
        name:'t5',
        run:function(callback){
            console.log('t5 is running, waiting tasks: ', q.length());
            util.timeout('t5',3000,callback);
        }
    },
    {
        name:'t6',
        run:function(callback){
            console.log('t6 is running, waiting tasks: ', q.length());
            util.timeout('t6',4000,callback);
        }
    }
],function(err){
    console.log('error:'+err);
});
console.log('pushed t3,t4,t5,t6 into queue, waiting tasks: ', q.length());

