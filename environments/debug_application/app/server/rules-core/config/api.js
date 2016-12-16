/**
 * This files stores configuration of all external data APIs which are consumed by the application.
 *
 * API configuration should be passed to TWC DAL models. Example:
 * @example
 * // something.redux.js
 * import { Alerts, instantiateModel } from '@twc/dal';
 * import { getApiConfig } from 'configs/api';
 *
 * const alerts = instantiateModel(Alerts, getApiConfig);
 * alerts.execute({ geocode: '50.43,30.52' }).then(...);
 *
 */

import get from 'lodash/get';

const apiConfig = {
  sun: {
    v1: {
      apiKey: 'c1ea9f47f6a88b9acb43aba7faf389d4',
      hostname: 'api.weather.com',
      pathname: '/v1',
      protocol: 'https:'
    },
    v2: {
      apiKey: '3d498bd0777076fb2aa967aa67114c7e',
      hostname: 'api.weather.com',
      pathname: '/v2',
      protocol: 'https:'
    },
    v3: {
      apiKey: 'c1ea9f47f6a88b9acb43aba7faf389d4',
      hostname: 'api.weather.com',
      pathname: '/v3',
      protocol: 'https:'
    }
  },
  dsx: {
    default: {
      hostname: 'dsx.weather.com',
      protocol: 'https:',
      apiKey: '7bb1c920-7027-4289-9c96-ae5e263980bc'
    }
  },
  s3: {
    ruleUrl: 'https://s3.amazonaws.com/s.w-x.co/profile/rules/rule/',
    priorityUrl: 'https://s.w-x.co/profile/rules/ruleset/'
  },
  cacheTime: 900000,
  apiKey: 'c1ea9f47f6a88b9acb43aba7faf38295',
  maxAgeLifetimes: {
    'lightning': 0.03,
    'dailyForecast': 13.15,
    'dateTime': 0.03,
    'drivingConditions': 5.7,
    'precipitation': 2.78,
    'cmsQuery': 4.45
  }
};

/**
 * Returns config of the specified API.
 *
 * @param {string} type
 * @param {string} version
 * @return {Object}
 */
export function getApiConfig(type, version) {
  var accessQuery = !!version ? `${type}.${version}` : `${type}`;

  return get(apiConfig, accessQuery);
}
