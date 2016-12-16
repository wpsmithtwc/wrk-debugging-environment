'use strict';

import RunRulesJob from '../rules-core/runner-service/RunRulesJob';
import { getApiConfig } from '../rules-core/config/api';
import { retrieveDatasources, composeMaxage } from '../middleware/cacheResponse';
import getAccessByApikey from '../middleware/access';

var debug = require('debug')('twc:rule model');
var etag = require('etag');

module.exports = function (Rules) {
  var methodsToExpose = ['evaluate'];

  Rules.evaluate = function (res, location, language, priority, units, ruleset, mode, apikey, cache, cb) {
    var requestData = {
      meta: { location, language, priority, units, ruleset, mode }
    };

    var job = new RunRulesJob(requestData);

    job.runRules()
      .then((result) => {
        try {
          let hash = etag(JSON.stringify(job.getResponseLight()));

          res.set('etag', hash);
        } catch (e) {
          debug(e);
        }

        return cb.apply(this, [null].concat(result));
      })
      .catch((err) => cb.apply(this, [err]));
  };

  Rules.remoteMethod(
    'evaluate', {
      http: {
        verb: 'get'
      },
      accepts: [
        {arg: 'res', type: 'object', 'http': {source: 'res'}},
        {arg: 'locId', type: 'string', default: 'USMA0046:1:US'},
        {arg: 'locale', type: 'string', default: 'en-US'},
        {arg: 'priority', type: 'string', default: 'mw_us_timeline'},
        {arg: 'units', type: 'string', default: 'e'},
        {arg: 'ruleset', type: 'string', default: 's3'},
        {arg: 'mode', type: 'string', default: 'demo'},
        {arg: 'apikey', type: 'string', default: 'c1ea9f47f6a88b9acb43aba7faf38295'},
        {arg: 'cache', type: 'string', default: 'false'}
      ],
      returns: [
        {arg: 'execTime', type: 'string'},
        {arg: 'meta', type: 'object'},
        {arg: 'timeMeta', type: 'object'},
        {arg: 'results', type: 'array'}
      ]
    }
  );

  Rules.sharedClass.methods().forEach((method) => {
    if (methodsToExpose.indexOf(method.name) < 0) {
      Rules.disableRemoteMethod(method.name, method.isStatic);
    }
  });

  Rules.beforeRemote('evaluate', (context, output, next) => {
    getAccessByApikey(context.req, context.res, next);
  });

  Rules.afterRemote('evaluate', (context, output, next) => {
    if (context.args.cache !== 'false') {
      let uniqueResponseDatasources = retrieveDatasources(context.result);
      let maxAge = composeMaxage(getApiConfig('maxAgeLifetimes'), uniqueResponseDatasources);

      if (!isNaN(maxAge) && maxAge !== null) {
        context.res.set('Cache-Control', `max-age=${maxAge}`);
      }
    }

    next();
  });

};
