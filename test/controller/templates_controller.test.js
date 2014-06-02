/**
 * New node file
 */

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var request = require('supertest');
var assert = require('assert');
var restify = require('restify');
var sinon = require('sinon');

mockgoose(mongoose);

var rek = require('rekuire');
var server = rek('server').createServer({});
var AppBuilderTemplate = rek('app_builder_template');



describe('POST /templates', function() {
	it('should insert a new template into mockgoose', function(done) {
		request(server)
			.post('/templates')
			.send({name: 'test', version: "1", description: "test desc", template: "test template"})
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.expect('Content-Type', /json/)
			.expect(201, done)
	});
});

describe('GET /templates?name=test&version=1', function() {
	it('responds with json', function(done) {
		request(server)
			.get('/templates?name=test&version=1')
			.set('Accept', 'application/json')
			.expect('content-encoding', /gzip/)
			.expect(200)
			.end(function(err, res) {
				assert.equal(res.body.name, 'test');
				assert.equal(res.body.version, '1');
				done();
			});
	});
});

describe('PUT /templates', function() {
	it('should update an existing template into mockgoose', function(done) {
		request(server)
			.put('/templates')
			.send({name: 'test', version: "1", description: "updated desc", template: "updated template"})
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				assert.equal(res.body.name, 'test');
				assert.equal(res.body.version, '1');
				assert.equal(res.body.description, 'updated desc');
				done();
			});
	});
});

describe('DELETE /templates', function() {
	it('should delete the existing template from mockgoose', function(done) {
		request(server)
			.del('/templates')
			.send({name: 'test', version: '1'})
			.set('Accept', 'application/json')
			.set('Content-Type', 'application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

///////////////////
// handling errors
///////////////////

describe('GET /templates?n=1&v=1', function() {
	var stub;
	before(function() {
		stub = sinon.stub(AppBuilderTemplate, "getTemplateByNameAndVersion");
		stub.callsArgWith(2, new Error(), {});
	});
	after(function() {
		stub.restore();
	});
	it('should throw an exception when getting templates and return 500', function(done) {
		request(server)
			.get('/templates?name=1&v=1')
			.expect(500, done);
	});
});

describe('POST /templates', function() {
	var stub;
	before(function() {
		stub = sinon.stub(AppBuilderTemplate, "insertTemplate");
		stub.callsArgWith(1, new Error(), {});
	});
	after(function() {
		stub.restore();
	});
	it('should throw an exception when posting templates and return 500', function(done) {
		request(server)
			.post('/templates')
			.send({name: "test"})
			.expect(500, done);
	});
});

describe('PUT /templates', function() {
	var stub;
	before(function() {
		stub = sinon.stub(AppBuilderTemplate, "updateTemplate");
		stub.callsArgWith(1, new Error(), {});
	});
	after(function() {
		stub.restore();
	});
	it('should throw an exception when putting templates and return 500', function(done) {
		request(server)
			.put('/templates')
			.send({name: 'test1'})
			.expect(500, done);
	});
});

describe('DELETE /templates', function() {
	var stub;
	before(function() {
		stub = sinon.stub(AppBuilderTemplate, "deleteTemplate");
		stub.callsArgWith(1, new Error());
	});
	after(function() {
		stub.restore();
	});
	it('should throw and excpetion when deleting template and return 500', function(done) {
		request(server)
			.del('/templates')
			.send({name: 'test1'})
			.expect(500, done);
	});
});