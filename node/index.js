var express = require('express'),
    http = require('http'),
    redis = require('redis');

var app = express();
//console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);

// APPROACH 1: Using environment variables created by Docker
// var client = redis.createClient(
// 	process.env.REDIS_PORT_6379_TCP_PORT,
//   	process.env.REDIS_PORT_6379_TCP_ADDR
// );

// APPROACH 2: Using host entries created by Docker in /etc/hosts (RECOMMENDED)
var client = redis.createClient();


app.get('/', function(req, res, next) {
  client.incr('counter', function(err, counter) {
    if(err) return next(err);
    var os = require('os');
	var hostname = os.hostname();
	
    res.write('This page has been viewed ' + counter + ' times!');
    res.write('\n\n Info:\n Hostname from whrer app is being served is : ' + hostname );
    res.end();
  });
});

http.createServer(app).listen(8080, function() {
  console.log('Listening on port ' + (8080));
});
