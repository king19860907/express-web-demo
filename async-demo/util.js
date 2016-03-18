/**
 * Created by jun_ma on 2016/3/18.
 */


var util = {
  error : function(errmsg,callback,timeout){
      timeout = timeout || 0;
      setTimeout(function(){
        callback(errmsg);
      },timeout)
  },
  msg : function(data,callback){
      callback(null,data);
  },
  timeout:function(data,timeout,callback){
      timeout = timeout || 200;
      setTimeout(function(){
        callback(null,data);
      },timeout);
  }
};

module.exports = util;