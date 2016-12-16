import chai from 'chai';
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

import DailyForecastLoader from '../../../server/rules-core/data-feader/loaders/DailyForecastLoader';
import FactProvider from '../../../server/rules-core/data-feader/FactProvider';
import RulesProvider from '../../../server/rules-core/definition-service/RulesProvider';

import Engine from '../../../server/rules-core/rules-engine/Engine';

var rules, dailyForecast, metaData;

describe('Tomorrow\'s Forecasted Chance of Precip Rule Test', () => {
  beforeEach(() => {
    metaData = {
      geocode: '42.89,-78.88',
      language: 'en-US',
      units: 'e'
    };

    rules = [
      {
        id: 'cpcp',
        conditions: [
          [{
            fact: 'tomorrow.day.precipPct',
            operator: 'greaterThanOrEqualTo',
            value: 60
          }]
        ],
        datasources: ['dailyForecast']
      }
    ];

    dailyForecast = [
    { validDate: '2016-11-17T07:00:00-0500',
      day:
      { dayPartName: 'Today',
        precipAmt: 5,
        snowRange: ''},
      night:
      { dayPartName: 'Tonight',
        precipAmt: 0,
        snowRange: ''} },
      { validDate: '2016-11-18T07:00:00-0500',
        day:
        { dayPartName: 'Tomorrow',
          precipAmt: 0,
          snowRange: ''},
        night:
        { dayPartName: 'Tomorrow night',
          precipAmt: 0,
          snowRange: ''} }
      ];
  });

  it('shouldn\'t match the rule', (done) => {
    let weatherData = {
      dailyForecast: {
        tomorrow: {
          day:
          { dayPartName: 'Tomorrow',
            precipPct: 10,
            snowRange: ''}}
      }
    };

    let factProvider = new FactProvider(metaData, weatherData);

    var rulesEngine = new Engine(rules);

    rulesEngine.runRules(factProvider).then((result) => {
      result.length === 0 && done();
    });

  });

  it('should match the rule', (done) => {
    let weatherData = {
      dailyForecast: {
        tomorrow: {
          day:
          { dayPartName: 'Tomorrow',
            precipPct: 70,
            snowRange: ''}}
      }
    };

    let factProvider = new FactProvider(metaData, weatherData);

    var rulesEngine = new Engine(rules);

    rulesEngine.runRules(factProvider).then((result) => {
      result.length !== 0 && done();
    });

  });

});
