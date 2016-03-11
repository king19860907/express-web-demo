/**
 * Created by jun_ma on 2016/3/11.
 */
var express = require('express');
var http = require('http');

var app = express();

app.use(function(request,response,next){
    console.log(request.url+" first method");
    next();
});

app.use(function(request,response,next){
    console.log(request.url+" second method");
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello world!\n");
});

app.listen(8080);