var http = require('http');
var ecstatic = require('ecstatic');
var alloc = require('tcp-bind');
var fd = alloc(80);

process.setgid('ubuntu');
process.setuid('ubuntu');

var server = http.createServer(ecstatic(__dirname));
server.listen({ fd: fd });
