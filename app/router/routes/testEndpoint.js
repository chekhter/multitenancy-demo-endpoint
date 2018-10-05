/*eslint no-shadow: 0*/
"use strict";

module.exports = function() {
	var app = require("express").Router();
	
	app.get('/', function(req, res) {
		console.log("Endpoint triggered via jobscheduler");
		res.status(201).json({success: true});});
	return app;
};