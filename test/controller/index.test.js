/**
 * Test file for the controller index file, used for setting up the server
 */
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var assert = require('assert');

mockgoose(mongoose);

var controllerIndex = require('../../src/controller/index');