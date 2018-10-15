/*eslint no-shadow: 0*/
"use strict";

module.exports = testEndpoint;


function hasScope(aScopes) {
    return function (request, response, next) {
        if (!request.authInfo) {
            console.log('Error creating SecurityContext');
            response.status(403).end('Forbidden');
            return;
        }

        while (aScopes.length) {
        	var scopeName = aScopes.shift();
            console.log(`Verifying scope (${scopeName}) in jwt`);
            if (request.authInfo.checkLocalScope(scopeName)) {
                next();
            }
        }
        console.log(`Missing the expected scopes (${JSON.stringify(aScopes)})`);
        response.status(403).end('Forbidden');
    };
}


function testEndpoint() {
	var app = require("express").Router();
	
	app.get('/', hasScope(["JOBSCHEDULER", "User"]), function(req, res) {
		console.log("Endpoint triggered via jobscheduler");
		res.status(201).json({success: true});});
	return app;
};