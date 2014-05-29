/**
 * A silly controller that hits a random api for testing out rest requests and testing this code.
 */

var restify = require('restify');

function getAllTodos(req, res, next) {
	var client = restify.createJsonClient({
		url: 'http://jsonplaceholder.typicode.com',
		version: '*'
	});
	
	client.get('/todos', function(err, request, response, obj) {
		if (err) {
			res.send(500, 'Could not get todos: ' + err);
		} else {
			res.send(200, obj);
		}
		next();
	});
}

function addRoutes(server) {
	server.get('/todos', getAllTodos);
}

//--------------------------
//---- EXPORTS
//--------------------------
module.exports = {
		addRoutes: addRoutes
};