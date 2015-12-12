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

/* MongoDB Setup */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/what-does-fb-know');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('mongoose: Connected to database \'what-does-fb-know\'');
});


var surveySchema = mongoose.Schema({
	age: String,
	sex: String,
	rankings: {
		empinfo: Number,
		finbeh: Number,
    	chardon: Number,
    	expinfo: Number,
    	resprof: Number,
    	travbeh: Number,
    	purchbeh: Number,
    	medcon: Number
	}
});

var Survey = mongoose.model('Survey', surveySchema);

/*var statsSchema = mongoose.Schema({
	allStats =
});*/

app.post('/submitsurvey', function (req, res) {
	console.log('POST request to /submitsurvey');
	var data = req.body;

	var newSurvey = {};
	newSurvey.age = data.age;
	newSurvey.sex = data.sex;
	newSurvey.rankings = {};
	newSurvey.rankings.empinfo = data.empinfo;
	newSurvey.rankings.finbeh  = data.finbeh;
	newSurvey.rankings.chardon = data.chardon;
	newSurvey.rankings.expinfo = data.expinfo;
	newSurvey.rankings.resprof = data.resprof;
	newSurvey.rankings.travbeh = data.travbeh;
	newSurvey.rankings.purchbeh = data.purchbeh;
	newSurvey.rankings.medcon 	= data.medcon;

	var object = new Survey(newSurvey);
	object.save(function (err) {
		if (err) return console.error(err);
	});

	res.end();
});


app.get('/', function (req, res) {
	console.log('GET request to /');
	res.send('Hello world!');
});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');