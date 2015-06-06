// Mongoose Setup

'use strict';

var clc = require('cli-color');
var fs = require('fs');
var Promise = require('bluebird');

exports.setup = function(app) {
	var databaseUrl = 'production' == app.get('env') && !!process.env.DB
		? process.env.DATABASE_URL
		: 'mongodb://localhost/hsnumc';
	var mongoose = require('mongoose');
	Promise.promisifyAll(mongoose);
	mongoose.connect(databaseUrl);
	// mongoose.set('debug', true);
	var filenames = fs.readdirSync('./models')
	filenames.forEach( function (filename) {
		require('../models/' + filename);
		console.log(clc.blue('[MongoDb] -'),' model ' + filename.split('.')[0] + ' is included');

	});
	console.log(clc.greenBright('[MongoDb] -'),' mongoose is up');
};