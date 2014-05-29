/**
 * Test resource for app_builder_template
 */
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var assert = require('assert');
var sinon = require('sinon');
var util = require('util');

var rek = require('rekuire');
var AppBuilderTemplate = rek('app_builder_template');

mockgoose(mongoose);

describe('app_builder_template', function() {
	describe('#insertTemplate', function() {
		it('should insert a new template', function() {
			var params = {
				name: 'test-template-1',
				description: 'a desc of test template 1.',
				version: 'version1',
				template: 'some template'
			};
			AppBuilderTemplate.insertTemplate(params, function(err, savedTemplate) {
				assert.notEqual(savedTemplate, null);
				assert.equal(savedTemplate.name, 'test-template-1');
			});
		});
	});
	describe('#getTemplateByNameAndVersion', function() {
		it('should return the template that was inserted', function() {
			AppBuilderTemplate.getTemplateByNameAndVersion('test-template-1', 'version1', function(err, foundTemplate) {
				assert.notEqual(foundTemplate, null);
				assert.equal(foundTemplate.name, 'test-template-1');
			});
		});
		it('should not return a template', function() {
			AppBuilderTemplate.getTemplateByNameAndVersion('xxxxx', 'xxxxx', function(err, foundTemplate) {
				assert.equal(foundTemplate, null);
			});
		});
	});
	describe('#updateTemplate', function() {
		it('should update the existing template', function() {
			AppBuilderTemplate.updateTemplate({name: 'test-template-1', description: 'new description', version: 'version1'}, function(err, savedTemplate, numRowsAffected) {
				assert.equal(savedTemplate.name, 'test-template-1');
				assert.equal(savedTemplate.description, 'new description');
			});
		});
		it('should do nothing because template does not exist for updating', function() {
			AppBuilderTemplate.updateTemplate({name: 'test-template-2', version: 'version1', description: 'new desc'}, function(err, savedTemplate, numRowsAffected) {
				assert.equal(savedTemplate, null);
			});
		});
	});
	describe('#updateTemplate throws Error', function() {
		var stub;
		before(function() {
			stub = sinon.stub(AppBuilderTemplate, 'findOne');
			stub.callsArgWith(1, new Error(), {});
		});
		after(function() {
			stub.restore();
		});
		it('findOne should throw and error and get handled by updateTemplate', function() {
			AppBuilderTemplate.updateTemplate({}, function(err, savedTemplate, numRowsAffected) {
				assert.notEqual(null, err);
			});
		});
	});
	describe('#deleteTemplate', function() {
		it('should delete the existing template', function() {
			AppBuilderTemplate.deleteTemplate({name: 'test-template-1', version: 'version1'}, function(err) {
				assert.equal(err, null);
			});
		});
		it('should do nothing because the template does not exist', function() {
			AppBuilderTemplate.deleteTemplate({name: 'xxxx', version: 'xxxx'}, function(err) {
				assert.equal(err, null);
			});
		});
	});
	describe('#deleteTemplate throws Error', function() {
		var stub;
		before(function() {
			stub = sinon.stub(AppBuilderTemplate, 'findOne');
			stub.callsArgWith(1, new Error(), null);
		});
		after(function() {
			stub.restore();
		});
		it('findOne should throw and error and get handled by deleteTemplate', function() {
			AppBuilderTemplate.deleteTemplate({name: 'test-template-1', version: 'version1'}, function(err) {
				assert.notStrictEqual(err, null);
			});
		});
	});
});