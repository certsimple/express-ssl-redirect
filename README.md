# Express SSL Redirect

Express 4.x middleware for SSL-only sites. Redirects http requests to https.

Similar to https://www.npmjs.com/package/force-ssl except it has a simpler setup (as it makes the requires Express 'app' for non-SSL users)

## Usage:

Typically in /bin/www:

	var sslRedirect = require('express-ssl-redirect');

Then:

	sslRedirect(80, 'example.com');

Of course, you should probably run node as a non-root user, which means binding to port above 1024, and mapping incoming port 80 connections to that high numbered port and incoming port 443  connection to another high numbered port. Check out [How I deploy node apps on Linux, 2015 edition](https://medium.com/@mikemaccana/how-i-deploy-node-apps-on-linux-2014-edition-309d606219ca) for information on running express as a non-root user.
