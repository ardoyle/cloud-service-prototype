/**
 * Main entry point into test cloud service application
 */

var bunyan = require('bunyan');
var restify = require('restify');

var NAME = 'test-cloud-services';

var myserver = require('./server');

// In true UNIX fashion, debug messages go to stderr, and audit records go
// to stdout, so you can split them as you like in the shell
var LOG = bunyan.createLogger({
    name: NAME,
    streams: [
        {
            level: (process.env.LOG_LEVEL || 'debug'),
            stream: process.stdout
        },
        {
            // This ensures that if we get a WARN or above all debug records
            // related to that request are spewed to stderr - makes it nice
            // filter out debug messages in prod, but still dump on user
            // errors so you can debug problems
            level: 'debug',
            type: 'raw',
            stream: new restify.bunyan.RequestCaptureStream({
                level: bunyan.DEBUG,
                maxRecords: 100,
                maxRequestIds: 1000,
                stream: process.stdout
            })
        }
    ],
    serializers: restify.bunyan.serializers
});

/*
 * Main method
 */
(function main() {
    var options = {};

    //LOG.debug(options, 'command line arguments parsed');

    // First setup our 'database'
//    var dir = path.normalize((options.directory || '/tmp') + '/todos');
//    try {
//        fs.mkdirSync(dir);
//    } catch (e) {
//        if (e.code !== 'EEXIST') {
//            LOG.fatal(e, 'unable to create "database" %s', dir);
//            process.exit(1);
//        }
//    }

    var server = myserver.createServer({
        log: LOG
    });

    // At last, let's rock and roll
    server.listen((options.port || 8000), function onListening() {
        LOG.info('listening at %s', server.url);
    });
})();