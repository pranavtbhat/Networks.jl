var expect = require('expect');
var http = require('http');
var superagent = require('superagent')

var app = require('../app');

var server = http.createServer(app);

describe('server', function() {
	before(function() {
		server.listen('3000');
	});

	it('should respond to GET for /', function(done) {
		superagent
			.get('http://localhost:3000')
			.end(function(error,res) {
				expect(res.status).toBe(200);
				done();
			});
	});
	after(function() {
		server.close();
	});
});