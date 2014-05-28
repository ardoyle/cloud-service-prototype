/**
 * Test resource for app_builder_template
 */
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var assert = require('assert');

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
				if (err) { console.log(err); }
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
	describe('#deleteTemplate', function() {
		it('should delete the existing template', function() {
			AppBuilderTemplate.deleteTemplate({name: 'test-template-1', version: 'version1'}, function(err) {
				assert.equal(err, null);
			});
		});
	});
});