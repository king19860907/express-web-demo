'use strict';
/**
 * Created by jun_ma on 2016/3/17.
 */

var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const url = 'mongodb://'+dbServer+':'+dbport+'/userSession';
session = session({
    store:new MongoStore({
        secret:'session',
        url:url
    }),
    resave: false,
    saveUninitialized: true,
    secret:'12345'
});

module.exports = session;
