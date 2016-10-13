const hostname = '127.0.0.1';
const port = 3000;

var express = require('express');
var app = express();
var router = require('./router')
app.set('view engine', 'pug');

console.log('var defined');
app.use('/', router);

console.log('router defined');
app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});