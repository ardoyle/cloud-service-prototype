/**
 * New node file
 */

var request = require('supertest');
var assert = require('assert');
var restify = require('restify');
var sinon = require('sinon');

var rek = require('rekuire');
var server = rek('server').createServer({noAudit: true});

//----------------------------------------------
//----  todo api test
//----------------------------------------------
var nock = require('nock');

describe('GET /todos gets nocked', function() {
	var todo_nock = nock('http://jsonplaceholder.typicode.com')
	.get('/todos')
	.reply(200, [{
		username: 'pgte',
		email: 'pedro.teixeira@gmail.com'
	}]);
	
	it('should return the custom json i set up in nock', function(done) {
		request(server)
			.get('/todos')
			.expect('Content-Type', /json/)
			.end(function(err, res) {
				assert.equal(res.body[0].username, 'pgte');
				done();
			});
	});
});

describe('GET /todos should handle error', function() {
	var error_nock = nock('http://jsonplaceholder.typicode.com')
	.get('/todos')
	.reply(404, {});
	
	it('should return and handle the rror', function(done) {
		request(server)
			.get('/todos')
			.expect(500, done);
	});
});