/*eslint no-shadow: 0*/
"use strict";

module.exports = testEndpoint;


function hasScope(scopeName) {
    return function (request, response, next) {
        if (!request.authInfo) {
            console.log('Error creating SecurityContext');
            response.status(403).end('Forbidden');
            return;
        }

        console.log(`Verifying scope (${scopeName}) in jwt`);
        if (!request.authInfo.checkLocalScope(scopeName)) {
            console.log(`Missing the expected scope (${scopeName})`);
            response.status(403).end('Forbidden');
        } else {
            next();
        }
    };
}


function testEndpoint() {
	var app = require("express").Router();
	
	app.get('/', hasScope("JOBSCHEDULER"), function(req, res) {
		console.log("Endpoint triggered via jobscheduler");
		res.status(201).json({success: true});});
	return app;
};