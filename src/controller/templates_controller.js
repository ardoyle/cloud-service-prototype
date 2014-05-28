/**
 * Set of endpoints for the App Builder application.  For managing the templates.
 */
var rek = require('rekuire');
var AppBuilderTemplate = rek('app_builder_template');

// --------------------------
// ---- ERRORS
// --------------------------



// --------------------------
// ---- HANDLERS
// --------------------------

// insert new template
function insertTemplate(req, res, next) {
	AppBuilderTemplate.insertTemplate(req.body, function(err, savedTemplate) {
		if (err) {
			res.send(500, 'Could not insert template: ' + err);
		} else {
			res.send(201, 'Inserted new template: ' + savedTemplate);
		}
		next();
	});
}

// get template by name and version
function getTemplateByNameAndVersion(req, res, next) {
	AppBuilderTemplate.getTemplateByNameAndVersion(req.params.name, req.params.version, function(err, foundTemplate) {
		if (err) {
			res.send(500, 'Could not find template: ' + err);
		} else {
			res.send(200, foundTemplate);
		}
		next();
	});
}

// update template
function updateTemplate(req, res, next) {
	AppBuilderTemplate.updateTemplate(req.body, function(err, updatedTemplate) {
		if (err) {
			res.send(500, 'Could not update template: ' + err);
		} else {
			res.send(200, updatedTemplate);
		}
		next();
	});
}

// delete template
function deleteTemplate(req, res, next) {
	AppBuilderTemplate.deleteTemplate(req.body, function(err) {
		if (err) {
			res.send(500, 'Could not delete template: ' + err);
		} else {
			res.send(200, 'Deleted Template Successfully: ' + req.body.name + '--' + req.body.version);
		}
		next();
	});
}


// --------------------------
// ---- CUSTOM RESTIFY INTEGRATION
// --------------------------
function addRoutes(server) {
	server.post({
		path: '/templates',
		contentType: 'application/json'
	}, insertTemplate);
	
	server.get('/templates', getTemplateByNameAndVersion);
	
	server.put({
		path: '/templates',
		contentType: 'application/json'
	}, updateTemplate);
	
	server.del({
		path: '/templates',
		contentType: 'application/json'
	}, deleteTemplate);
}


// --------------------------
// ---- EXPORTS
// --------------------------
module.exports = {
		addRoutes: addRoutes
};