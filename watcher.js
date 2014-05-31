var touch = require("touch"),
	connect = require('connect'),
    http = require('http');

module.exports = function() {
	var app = connect()
	  .use(function(req, res){
	  	console.log(req);
	  	touch.sync(req.url.replace(/^\//, ""));
	    res.end('Hello from Connect!\n');
	  });

	http.createServer(app).listen(3000);
};