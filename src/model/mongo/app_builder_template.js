/**
 * Mongoose model object for storing the app builder templates.
 */

var mongoose = require('mongoose');

var AppBuilderTemplateSchema = new mongoose.Schema({
	name: String,
	description: String,
	version: String,
	template: String
});

AppBuilderTemplateSchema.index({name: 1, version: 1}, {unique: true});

var AppBuilderTemplate = module.exports = mongoose.model('AppBuilderTemplate', AppBuilderTemplateSchema);

function _paramsToTemplate(params) {
	var appTemplate = new AppBuilderTemplate();
	appTemplate.name = params.name;
	appTemplate.description = params.description;
	appTemplate.version = params.version;
	appTemplate.template = params.template;
	return appTemplate;
}

module.exports.getTemplateByNameAndVersion = function(name, version, callback) {
	var query = {name: name, version: version};
	AppBuilderTemplate.findOne(query, callback);
};

module.exports.insertTemplate = function(params, callback) {
	var appTemplate = _paramsToTemplate(params);
	AppBuilderTemplate.create(appTemplate, callback);
};

module.exports.updateTemplate = function(params, callback) {
	var appTemplate = _paramsToTemplate(params);
	var query = {name: params.name, version: params.version};
	AppBuilderTemplate.findOne(query, function(err, foundTemplate) {
		if (err) {
			callback(err, null, 0);
		} else if (foundTemplate !== null) {
			foundTemplate.description = appTemplate.description;
			foundTemplate.tmeplate = appTemplate.template;
			foundTemplate.save(callback);
		} else {
			callback(null, null, 0);
		}
	});
};

module.exports.deleteTemplate = function(params, callback) {
	var query = {name: params.name, version: params.version};
	AppBuilderTemplate.findOne(query, function(err, foundTemplate) {
		if (err) {
			callback(err);
		} else if (foundTemplate !== null) {
			foundTemplate.remove();
		}
		callback();
	});
};