/**
 * Controller for interacting with aws for all ec2 related interactions.
 */

var AWS = require('aws-sdk');
var path = require('path');

function describeInstances(req, res, next) {
	
	var config = new AWS.Config();
	config.loadFromPath(__dirname + '/aws-config.json');
	
	var ec2 = new AWS.EC2(config);

	ec2.describeInstances({}, function(err, data) {
		if (err) {
			res.send(500, 'Could not describe instances: ' + err.stack);
		} else {
			res.send(200, data);
		}
		next();
	});
}

function createInstance(req, res, next) {
	
	var config = new AWS.Config();
	config.loadFromPath(__dirname + '/aws-config.json');
	
	var ec2 = new AWS.EC2(config);

	var params = {
		ImageId : 'ami-8d756fe4', // required
		MaxCount : 1, // required
		MinCount : 1, // required
		InstanceType : 't1.micro',
		Placement : {
			AvailabilityZone : 'us-east-1b'
		},
	};
	
	ec2.runInstances(params, function(err, data) {
		if (err) {
			res.send(500, 'Could not create and run instances: ' + err.stack);
		} else {
			res.send(200, data);
		}
		next();
	});
}

function addRoutes(server) {
	server.get('/describeInstances', describeInstances);
	server.post({
		path: '/createInstance',
		contentType: 'application/json'
	}, createInstance);
}

//--------------------------
//---- EXPORTS
//--------------------------
module.exports = {
		addRoutes: addRoutes
};