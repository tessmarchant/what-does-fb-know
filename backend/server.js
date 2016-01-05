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

var statSchema = mongoose.Schema({
	allStats: {
		age: [Number],
		sex: [Number],
		empinfo: [Number],
		finbeh: [Number],
    	chardon: [Number],
    	expinfo: [Number],
    	resprof: [Number],
    	travbeh: [Number],
    	purchbeh: [Number],
    	medcon: [Number]
	},
	maleStats: {
		empinfo: [Number],
		finbeh: [Number],
    	chardon: [Number],
    	expinfo: [Number],
    	resprof: [Number],
    	travbeh: [Number],
    	purchbeh: [Number],
    	medcon: [Number]
	},
	femaleStats: {
		empinfo: [Number],
		finbeh: [Number],
    	chardon: [Number],
    	expinfo: [Number],
    	resprof: [Number],
    	travbeh: [Number],
    	purchbeh: [Number],
    	medcon: [Number]
	},
	age1319Stats: {
		empinfo: [Number],
		finbeh: [Number],
    	chardon: [Number],
    	expinfo: [Number],
    	resprof: [Number],
    	travbeh: [Number],
    	purchbeh: [Number],
    	medcon: [Number]
	},
	age2029Stats: {
		empinfo: [Number],
		finbeh: [Number],
    	chardon: [Number],
    	expinfo: [Number],
    	resprof: [Number],
    	travbeh: [Number],
    	purchbeh: [Number],
    	medcon: [Number]
	},
	age3039Stats: {
		empinfo: [Number],
		finbeh: [Number],
    	chardon: [Number],
    	expinfo: [Number],
    	resprof: [Number],
    	travbeh: [Number],
    	purchbeh: [Number],
    	medcon: [Number]
	},
	age4049Stats: {
		empinfo: [Number],
		finbeh: [Number],
    	chardon: [Number],
    	expinfo: [Number],
    	resprof: [Number],
    	travbeh: [Number],
    	purchbeh: [Number],
    	medcon: [Number]
	},
	age50Stats: {
		empinfo: [Number],
		finbeh: [Number],
    	chardon: [Number],
    	expinfo: [Number],
    	resprof: [Number],
    	travbeh: [Number],
    	purchbeh: [Number],
    	medcon: [Number]
	}
});

var Stat = mongoose.model('Statistic', statSchema);


var survey2Schema = mongoose.Schema({
	answer: [Number]
});

var Survey2 = mongoose.model('Survey2', survey2Schema);

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

	Stat.findOne({}, function(err, stats) {
		if (err) {
	      console.log('Database error.');
	      res.status(500).send({msg: 'Database error.'});
	    }
		if (stats == null) {
			var newStats = {
				allStats: {
					age: [0,0,0,0,0],
					sex: [0,0],
					empinfo: [0,0,0,0,0,0,0,0],
					finbeh: [0,0,0,0,0,0,0,0],
			    	chardon: [0,0,0,0,0,0,0,0],
			    	expinfo: [0,0,0,0,0,0,0,0],
			    	resprof: [0,0,0,0,0,0,0,0],
			    	travbeh: [0,0,0,0,0,0,0,0],
			    	purchbeh: [0,0,0,0,0,0,0,0],
			    	medcon: [0,0,0,0,0,0,0,0]
			    },
				maleStats: {
					empinfo: [0,0,0,0,0,0,0,0],
					finbeh: [0,0,0,0,0,0,0,0],
			    	chardon: [0,0,0,0,0,0,0,0],
			    	expinfo: [0,0,0,0,0,0,0,0],
			    	resprof: [0,0,0,0,0,0,0,0],
			    	travbeh: [0,0,0,0,0,0,0,0],
			    	purchbeh: [0,0,0,0,0,0,0,0],
			    	medcon: [0,0,0,0,0,0,0,0]
				},
				femaleStats: {
					empinfo: [0,0,0,0,0,0,0,0],
					finbeh: [0,0,0,0,0,0,0,0],
			    	chardon: [0,0,0,0,0,0,0,0],
			    	expinfo: [0,0,0,0,0,0,0,0],
			    	resprof: [0,0,0,0,0,0,0,0],
			    	travbeh: [0,0,0,0,0,0,0,0],
			    	purchbeh: [0,0,0,0,0,0,0,0],
			    	medcon: [0,0,0,0,0,0,0,0]
				},
				age1319Stats: {
					empinfo: [0,0,0,0,0,0,0,0],
					finbeh: [0,0,0,0,0,0,0,0],
			    	chardon: [0,0,0,0,0,0,0,0],
			    	expinfo: [0,0,0,0,0,0,0,0],
			    	resprof: [0,0,0,0,0,0,0,0],
			    	travbeh: [0,0,0,0,0,0,0,0],
			    	purchbeh: [0,0,0,0,0,0,0,0],
			    	medcon: [0,0,0,0,0,0,0,0]
				},
				age2029Stats: {
					empinfo: [0,0,0,0,0,0,0,0],
					finbeh: [0,0,0,0,0,0,0,0],
			    	chardon: [0,0,0,0,0,0,0,0],
			    	expinfo: [0,0,0,0,0,0,0,0],
			    	resprof: [0,0,0,0,0,0,0,0],
			    	travbeh: [0,0,0,0,0,0,0,0],
			    	purchbeh: [0,0,0,0,0,0,0,0],
			    	medcon: [0,0,0,0,0,0,0,0]
				},
				age3039Stats: {
					empinfo: [0,0,0,0,0,0,0,0],
					finbeh: [0,0,0,0,0,0,0,0],
			    	chardon: [0,0,0,0,0,0,0,0],
			    	expinfo: [0,0,0,0,0,0,0,0],
			    	resprof: [0,0,0,0,0,0,0,0],
			    	travbeh: [0,0,0,0,0,0,0,0],
			    	purchbeh: [0,0,0,0,0,0,0,0],
			    	medcon: [0,0,0,0,0,0,0,0]
				},
				age4049Stats: {
					empinfo: [0,0,0,0,0,0,0,0],
					finbeh: [0,0,0,0,0,0,0,0],
			    	chardon: [0,0,0,0,0,0,0,0],
			    	expinfo: [0,0,0,0,0,0,0,0],
			    	resprof: [0,0,0,0,0,0,0,0],
			    	travbeh: [0,0,0,0,0,0,0,0],
			    	purchbeh: [0,0,0,0,0,0,0,0],
			    	medcon: [0,0,0,0,0,0,0,0]
				},
				age50Stats: {
					empinfo: [0,0,0,0,0,0,0,0],
					finbeh: [0,0,0,0,0,0,0,0],
			    	chardon: [0,0,0,0,0,0,0,0],
			    	expinfo: [0,0,0,0,0,0,0,0],
			    	resprof: [0,0,0,0,0,0,0,0],
			    	travbeh: [0,0,0,0,0,0,0,0],
			    	purchbeh: [0,0,0,0,0,0,0,0],
			    	medcon: [0,0,0,0,0,0,0,0]
				}
			};

			var object = new Stat(newStats);
			object.save(function (err) {
				if (err) return console.error(err);
				updateStats(newSurvey);
			});
		}
		// after stats object is created
		else {
			updateStats(newSurvey);
		}

		function updateStats(newSurvey) {
			var update = {$inc: {}};
			switch(newSurvey.age) {
				case '1319':
					update.$inc['allStats.age.0'] = 1;
					break;
				case '2029':
					update.$inc['allStats.age.1'] = 1;
					break;
				case '3039':
					update.$inc['allStats.age.2'] = 1;
					break;
				case '4049':
					update.$inc['allStats.age.3'] = 1;
					break;
				case '5059':
					update.$inc['allStats.age.4'] = 1;
					break;
			}
			switch(newSurvey.sex) {
				case 'male':
					update.$inc['allStats.sex.0'] = 1;
					break;
				case 'female':
					update.$inc['allStats.sex.1'] = 1;
					break;
			}
			update.$inc['allStats.empinfo.' + newSurvey.rankings.empinfo] = 1;
			update.$inc['allStats.finbeh.' + newSurvey.rankings.finbeh] = 1;
			update.$inc['allStats.chardon.' + newSurvey.rankings.chardon] = 1;
			update.$inc['allStats.expinfo.' + newSurvey.rankings.expinfo] = 1;
			update.$inc['allStats.resprof.' + newSurvey.rankings.resprof] = 1;
			update.$inc['allStats.travbeh.' + newSurvey.rankings.travbeh] = 1;
			update.$inc['allStats.purchbeh.' + newSurvey.rankings.purchbeh] = 1;
			update.$inc['allStats.medcon.' + newSurvey.rankings.medcon] = 1;

			if (newSurvey.sex === 'male') {
				update.$inc['maleStats.empinfo.' + newSurvey.rankings.empinfo] = 1;
				update.$inc['maleStats.finbeh.' + newSurvey.rankings.finbeh] = 1;
				update.$inc['maleStats.chardon.' + newSurvey.rankings.chardon] = 1;
				update.$inc['maleStats.expinfo.' + newSurvey.rankings.expinfo] = 1;
				update.$inc['maleStats.resprof.' + newSurvey.rankings.resprof] = 1;
				update.$inc['maleStats.travbeh.' + newSurvey.rankings.travbeh] = 1;
				update.$inc['maleStats.purchbeh.' + newSurvey.rankings.purchbeh] = 1;
				update.$inc['maleStats.medcon.' + newSurvey.rankings.medcon] = 1;
			}

			if (newSurvey.sex === 'female') {
				update.$inc['femaleStats.empinfo.' + newSurvey.rankings.empinfo] = 1;
				update.$inc['femaleStats.finbeh.' + newSurvey.rankings.finbeh] = 1;
				update.$inc['femaleStats.chardon.' + newSurvey.rankings.chardon] = 1;
				update.$inc['femaleStats.expinfo.' + newSurvey.rankings.expinfo] = 1;
				update.$inc['femaleStats.resprof.' + newSurvey.rankings.resprof] = 1;
				update.$inc['femaleStats.travbeh.' + newSurvey.rankings.travbeh] = 1;
				update.$inc['femaleStats.purchbeh.' + newSurvey.rankings.purchbeh] = 1;
				update.$inc['femaleStats.medcon.' + newSurvey.rankings.medcon] = 1;
			}

			if (newSurvey.age === '1319') {
				update.$inc['age1319Stats.empinfo.' + newSurvey.rankings.empinfo] = 1;
				update.$inc['age1319Stats.finbeh.' + newSurvey.rankings.finbeh] = 1;
				update.$inc['age1319Stats.chardon.' + newSurvey.rankings.chardon] = 1;
				update.$inc['age1319Stats.expinfo.' + newSurvey.rankings.expinfo] = 1;
				update.$inc['age1319Stats.resprof.' + newSurvey.rankings.resprof] = 1;
				update.$inc['age1319Stats.travbeh.' + newSurvey.rankings.travbeh] = 1;
				update.$inc['age1319Stats.purchbeh.' + newSurvey.rankings.purchbeh] = 1;
				update.$inc['age1319Stats.medcon.' + newSurvey.rankings.medcon] = 1;
			}

			if (newSurvey.age === '2029') {
				update.$inc['age2029Stats.empinfo.' + newSurvey.rankings.empinfo] = 1;
				update.$inc['age2029Stats.finbeh.' + newSurvey.rankings.finbeh] = 1;
				update.$inc['age2029Stats.chardon.' + newSurvey.rankings.chardon] = 1;
				update.$inc['age2029Stats.expinfo.' + newSurvey.rankings.expinfo] = 1;
				update.$inc['age2029Stats.resprof.' + newSurvey.rankings.resprof] = 1;
				update.$inc['age2029Stats.travbeh.' + newSurvey.rankings.travbeh] = 1;
				update.$inc['age2029Stats.purchbeh.' + newSurvey.rankings.purchbeh] = 1;
				update.$inc['age2029Stats.medcon.' + newSurvey.rankings.medcon] = 1;
			}

			if (newSurvey.age === '3039') {
				update.$inc['age3039Stats.empinfo.' + newSurvey.rankings.empinfo] = 1;
				update.$inc['age3039Stats.finbeh.' + newSurvey.rankings.finbeh] = 1;
				update.$inc['age3039Stats.chardon.' + newSurvey.rankings.chardon] = 1;
				update.$inc['age3039Stats.expinfo.' + newSurvey.rankings.expinfo] = 1;
				update.$inc['age3039Stats.resprof.' + newSurvey.rankings.resprof] = 1;
				update.$inc['age3039Stats.travbeh.' + newSurvey.rankings.travbeh] = 1;
				update.$inc['age3039Stats.purchbeh.' + newSurvey.rankings.purchbeh] = 1;
				update.$inc['age3039Stats.medcon.' + newSurvey.rankings.medcon] = 1;
			}

			if (newSurvey.age === '4049') {
				update.$inc['age4049Stats.empinfo.' + newSurvey.rankings.empinfo] = 1;
				update.$inc['age4049Stats.finbeh.' + newSurvey.rankings.finbeh] = 1;
				update.$inc['age4049Stats.chardon.' + newSurvey.rankings.chardon] = 1;
				update.$inc['age4049Stats.expinfo.' + newSurvey.rankings.expinfo] = 1;
				update.$inc['age4049Stats.resprof.' + newSurvey.rankings.resprof] = 1;
				update.$inc['age4049Stats.travbeh.' + newSurvey.rankings.travbeh] = 1;
				update.$inc['age4049Stats.purchbeh.' + newSurvey.rankings.purchbeh] = 1;
				update.$inc['age4049Stats.medcon.' + newSurvey.rankings.medcon] = 1;
			}

			if (newSurvey.age === '5059') {
				update.$inc['age50Stats.empinfo.' + newSurvey.rankings.empinfo] = 1;
				update.$inc['age50Stats.finbeh.' + newSurvey.rankings.finbeh] = 1;
				update.$inc['age50Stats.chardon.' + newSurvey.rankings.chardon] = 1;
				update.$inc['age50Stats.expinfo.' + newSurvey.rankings.expinfo] = 1;
				update.$inc['age50Stats.resprof.' + newSurvey.rankings.resprof] = 1;
				update.$inc['age50Stats.travbeh.' + newSurvey.rankings.travbeh] = 1;
				update.$inc['age50Stats.purchbeh.' + newSurvey.rankings.purchbeh] = 1;
				update.$inc['age50Stats.medcon.' + newSurvey.rankings.medcon] = 1;
			}

			Stat.findOneAndUpdate({}, update, function (err, statistic) {
				if (err) {
					console.error(err);
				}
			});
		}

	});	


	res.end();
});


app.post('/submitsurvey2', function (req, res) {
	console.log('POST request to /submitsurvey2');
	var data = req.body;

	Survey2.findOne({}, function(err, survey) {
		if (err) {
	      console.log('Database error.');
	      res.status(500).send({msg: 'Database error.'});
	    }
		if (survey == null) {
			var newSurvey = {
				answer: [0,0,0]
			};

			if (data.answer == 'yes') {
				newSurvey.answer[0] = 1;
			}
			else if (data.answer == 'no') {
				newSurvey.answer[1] = 1;
			}
			else if (data.answer == 'na') {
				newSurvey.answer[2] = 1;
			}
			else {

			}

			var object = new Survey2(newSurvey);
			object.save(function (err) {
				if (err) return console.error(err);
			});

		}

		else {
			var update = {$inc: {}};
			if (data.answer == 'yes') {
				update.$inc['answer.0'] = 1;
			}
			else if (data.answer == 'no') {

				update.$inc['answer.1'] = 1;
			}
			else if (data.answer == 'na') {
				update.$inc['answer.2'] = 1;
			}
			else {

			}

			Survey2.findOneAndUpdate({}, update, function (err, survey) {
				if (err) {
					console.error(err);
				}
			});
		}

	});

	res.end();
});

app.get('/statistics', function (req, res) {
	console.log('GET request to /statistics');
	Stat.findOne({}, function(err, stats) {
		if (err) {
	      console.log('Database error.');
	      res.status(500).send({msg: 'Database error.'});
	    }
	    else {
	    	if (stats != null) {
	    		res.send(stats);
	    	}
	    	else {
	    		res.status(500).send({msg: 'No statistics found.'});
	    	}
	    }
	});
});


app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');