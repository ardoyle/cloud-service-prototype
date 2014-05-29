/**
 * Test file for the templates controller.
 */

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var restify = require('restify');
var assert = require('assert');
var util = require('util');
var sinon = require('sinon');

mockgoose(mongoose);

var rek = require('rekuire');
var templates_controller = rek('templates_controller');

// for sinon use
var AppBuilderTemplate = rek('app_builder_template');

describe('templates_controller', function() {
	describe('#addRoutes', function() {
		var server = restify.createServer();
		templates_controller.addRoutes(server);
//		console.log(util.inspect(server.routes, { showHidden: true, depth: null }));
		it('should have added routes to the restify server', function() {
			assert.equal(server.routes['gettemplates'].length, 1);
			assert.equal(server.routes['puttemplates'].length, 1);
			assert.equal(server.routes['posttemplates'].length, 1);
			assert.equal(server.routes['deletetemplates'].length, 1);
		});
	});	
});