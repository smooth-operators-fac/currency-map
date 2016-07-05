var tape = require('tape');
var shot = require('shot');

var handler = require('../../server/handler.js');

//this test is from handler(make array and then load html)
tape('GET request to / endpoint', function(t){
  shot.inject(handler, {method: 'get', url: '/'}, function(res){
    t.equal(res.statusCode, 200, 'responds with status 200');
    t.ok(res.payload.includes('<!DOCTYPE html'), 'responds with html file');
    t.equal(res.headers['Content-Type'], 'text/html', 'responds with header specifying type html');
    t.end();
  });
});

tape('GET request to wrong url', function(t){
  shot.inject(handler, {method: 'get', url: '/bad-url'}, function(res){
    t.equal(res.statusCode, 404, 'responds with status 404');
    t.end();
  });
});

tape('GET request to /public/js/svg.js endpoint', function(t){
	shot.inject(handler, {method: 'get', url: '/public/js/svg.js'}, function(res){
    t.equal(res.statusCode, 200, '/ has status code of 200');
    t.ok(res.payload.includes('selectBox'), 'responds with correct file');
    t.end();
  });
});

