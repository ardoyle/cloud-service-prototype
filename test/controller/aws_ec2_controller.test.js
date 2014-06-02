/**
 * New node file
 */

var request = require('supertest');
var assert = require('assert');
var restify = require('restify');
var sinon = require('sinon');
var AWS = require('aws-sdk');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);

var rek = require('rekuire');
var server = rek('server').createServer({});

//----------------------------------------------
//----  todo api test
//----------------------------------------------

describe('GET /describeInstances', function() {
	
	var ec2;
	var aws_ec2_stub;
	var ec2_stub;
	
	before(function() {
		ec2 = new AWS.EC2({});
		
		aws_ec2_stub = sinon.stub(AWS, 'EC2');
		aws_ec2_stub.returns(ec2);
		
		ec2_stub = sinon.stub(ec2, "describeInstances");
		ec2_stub.callsArgWith(1, null, {"mockeddata": "yup"});
	});
	after(function() {
		aws_ec2_stub.restore();
		ec2_stub.restore();
	});
	
	it('should return the custom json', function(done) {
		request(server)
			.get('/describeInstances')
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});


describe('GET /describeInstances should handle error', function() {
	
	var ec2;
	var aws_ec2_stub;
	var ec2_stub;
	
	
	before(function() {
		ec2 = new AWS.EC2({});
		
		aws_ec2_stub = sinon.stub(AWS, 'EC2');
		aws_ec2_stub.returns(ec2);
		
		ec2_stub = sinon.stub(ec2, "describeInstances");
		ec2_stub.callsArgWith(1, new Error(), {"mockeddata": "yup"});
	});
	after(function() {
		aws_ec2_stub.restore();
		ec2_stub.restore();
	});
	
	it('should handle the error', function(done) {
		request(server)
			.get('/describeInstances')
			.expect('Content-Type', /json/)
			.expect(500, done);
	});
});


describe('POST /createInstances', function() {
	
	var ec2;
	var aws_ec2_stub;
	var ec2_stub;
	
	before(function() {
		ec2 = new AWS.EC2({});
		
		aws_ec2_stub = sinon.stub(AWS, 'EC2');
		aws_ec2_stub.returns(ec2);
		
		ec2_stub = sinon.stub(ec2, "runInstances");
		ec2_stub.callsArgWith(1, null, {"mockeddata": "yup"});
	});
	after(function() {
		aws_ec2_stub.restore();
		ec2_stub.restore();
	});
	
	it('should return the custom json', function(done) {
		request(server)
			.post('/createInstance')
			.send({})
			.expect('Content-Type', /json/)
			.expect(200, done);
	});
});

describe('POST /createInstances should handle error', function() {
	
	var ec2;
	var aws_ec2_stub;
	var ec2_stub;
	
	
	before(function() {
		ec2 = new AWS.EC2({});
		
		aws_ec2_stub = sinon.stub(AWS, 'EC2');
		aws_ec2_stub.returns(ec2);
		
		ec2_stub = sinon.stub(ec2, "runInstances");
		ec2_stub.callsArgWith(1, new Error(), {"mockeddata": "yup"});
	});
	after(function() {
		aws_ec2_stub.restore();
		ec2_stub.restore();
	});
	
	it('should handle the error', function(done) {
		request(server)
			.post('/createInstance')
			.send({})
			.expect('Content-Type', /json/)
			.expect(500, done);
	});
});