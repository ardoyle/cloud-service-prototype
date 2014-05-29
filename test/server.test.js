/**
 * Test file for the server.
 */

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var assert = require('assert');
var sinon = require('sinon');
var restify = require('restify');

mockgoose(mongoose);

var rek = require('rekuire');
var server = rek('server');
var templates_controller = rek('templates_controller');

describe('server', function() {
	describe('#createServer', function() {
		before(function() {
			sinon.spy(restify, 'createServer');
			sinon.spy(templates_controller, 'addRoutes');
		});
		after(function() {
			restify.createServer.restore();
			templates_controller.addRoutes.restore();
		});
		it('should inspect the restify createServer method', function() {
			var restifyServer = server.createServer({});
			
			assert.ok(restify.createServer.calledOnce);
			assert.equal("test-cloud-services", restify.createServer.getCall(0).args[0].name);
			
			assert.ok(templates_controller.addRoutes.calledOnce);
		})
	})
})