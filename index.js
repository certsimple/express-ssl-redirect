// Redirect clients on http to https

var debug = require('debug')('express-ssl-redirect'),
	express = require('express'),
	httpStatus = require('http-status-codes'),
	http = require('http');

var log = console.log.bind(console);

// port:Number HTTP port to listen on
// defaultHost:String - used for HTTP 1.0 clients (eg, wget, other out of date web tools)
// See http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.23
module.exports = function(port, defaultHost){

	// Create HTTP server.
	var redirectApp = express(),
		redirectServer = http.createServer(redirectApp);

	// Listen on provided port, on all network interfaces.
	redirectServer.listen(port);

	redirectServer.on('error', function(error) {
	  if (error.syscall !== 'listen') {
	    throw error;
	  }

	  // handle specific listen errors with friendly messages
	  switch (error.code) {
	    case 'EACCES':
	      console.error('Port ' + port + ' requires elevated privileges');
	      process.exit(1);
	      break;
	    case 'EADDRINUSE':
	      console.error('Port ' + port + ' is already in use');
	      process.exit(1);
	      break;
	    default:
	      throw error;
	  }
	});

	redirectServer.on('listening', function() {
	  debug('Listening on port ' + redirectServer.address().port);
	});

	redirectApp.use(function requireHTTPS(req, res, next) {
	  if ( ! req.secure ) {
	  	var hostWithoutPort
			if ( req.headers.host ) {
				hostWithoutPort = req.headers.host.split(':')[0]
			} else {
				hostWithoutPort = defaultHost
			}
			// Permanent redirect for SEO
			return res.redirect(httpStatus.MOVED_PERMANENTLY, 'https://' + hostWithoutPort + req.url);
	  }
	  next();
	})
}


