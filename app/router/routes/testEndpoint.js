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

        console.log(`Probing the scopes (${JSON.stringify(aScopes)})`);
        for (var i=0; i<aScopes.length; i++) {
            console.log(`Verifying scope (${aScopes[i]}) in jwt`);
            if (request.authInfo.checkLocalScope(aScopes[i])) {
                next();
                return;
            }
        }
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