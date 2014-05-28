/**
 * Index of all controllers
 */
/**
 * Index of all the controllers, this creates the service and includes all the controllers.
 */

var restify = require('restify');
var bunyan = require('bunyan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/templates');

// controllers
var templatesController = require('./templates_controller');

/**
 * gather endpoints from the exports of each controller,
 * add them to a server and export a create server method...
 */
function createServer(options) {

    // Create a server with our logger and custom formatter
    // Note that 'version' means all routes will default to
    // 1.0.0
    var server = restify.createServer({
        log: options.log,
        name: 'test-cloud-services',
        version: '1.0.0'
    });

    // Ensure we don't drop data on uploads
    server.pre(restify.pre.pause());

    // Clean up sloppy paths like //todo//////1//
    server.pre(restify.pre.sanitizePath());

    // Handles annoying user agents (curl)
    server.pre(restify.pre.userAgentConnection());

    // Set a per request bunyan logger (with requestid filled in)
    server.use(restify.requestLogger());

    // Allow 5 requests/second by IP, and burst to 10
    server.use(restify.throttle({
        burst: 10,
        rate: 5,
        ip: true,
    }));

    // Use the common stuff you probably want
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.dateParser());
    //server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.gzipResponse());
    server.use(restify.bodyParser());

    // Now our own handlers for authentication/authorization
    // Here we only use basic auth, but really you should look
    // at https://github.com/joyent/node-http-signature
//    server.use(function setup(req, res, next) {
//        req.dir = options.directory;
//        if (options.user && options.password) {
//            req.allow = {
//                user: options.user,
//                password: options.password
//            };
//        }
//        next();
//    });
//    server.use(authenticate);

    // add routes from controllers
    templatesController.addRoutes(server);

//    // Register a default '/' handler
//
//    server.get('/', function root(req, res, next) {
//        var routes = [
//            'GET     /'
//        ];
//        // add all routes exported by each controller
//        routes = routes.concat(cloudformations.getRoutes());
//        routes = routes.concat(cloudcreations.getRoutes());
//        
//        res.send(200, routes);
//        next();
//    });

    // Setup an audit logger
    if (!options.noAudit) {
        server.on('after', restify.auditLogger({
            body: true,
            log: bunyan.createLogger({
                level: 'debug',
                name: 'cloudservicesprototype-audit',
                stream: process.stdout
            })
        }));
    }

    return (server);
}

module.exports = {
    createServer: createServer
};