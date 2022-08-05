var express = require('express');
var app = express();
function queryRemover(req, res, next){
    console.log("\nBefore URL: ");
    console.log(req.url);
    req.url = req.url.split('?')[0];
    console.log("\nAfter URL: ");
    console.log(req.url);
    next();
};