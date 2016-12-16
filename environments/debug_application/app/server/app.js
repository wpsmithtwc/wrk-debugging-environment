'use strict';

import loopback from 'loopback';
import health from 'express-ping';

import packageJson from '../package.json';

var debug = require('debug')('twc:MainApp');

const app = module.exports = loopback();

app.start = function () {
  // start the web server
  return app.listen(() => {
    var explorerPath;

    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');

    debug('Web server listening at: %s', baseUrl);

    if (app.get('loopback-component-explorer')) {
      explorerPath = app.get('loopback-component-explorer').mountPath;
      debug('Browse your REST API at %s%s', baseUrl, explorerPath);
    }

    setUpServiceMiddleware();
    setUpServiceRoutes();
  });
};

const setUpServiceMiddleware = function () {
  app.use((req, res, next) => {
    res.setHeader(`${packageJson.name}__version`, packageJson.version);

    return next();
  });
};

const setUpServiceRoutes = function () {
  app.use(health.ping(`/${packageJson.name}/health`));
};

