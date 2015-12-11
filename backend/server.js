var http = require('http');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
//var multer = require('multer');
//var crypto = require('crypto');
//var async = require('async');
//var fs = require('fs');
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.post('/submitsurvey', function (req, res) {
	console.log('POST request to /submitsurvey');
	console.log(req.body);
	// Store and process the survey data here
	res.end();
});


app.get('/', function (req, res) {
	console.log('GET request to /');
	res.send('Hello world!');
});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');