if (process.env.NODE_ENV === 'production') require('newrelic');

require('./server/server');
require('./server/app').start();
