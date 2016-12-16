import chai from 'chai';
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

import DailyForecastLoader from '../../../server/rules-core/data-feader/loaders/DailyForecastLoader';
import FactProvider from '../../../server/rules-core/data-feader/FactProvider';
import RulesProvider from '../../../server/rules-core/definition-service/RulesProvider';

import Engine from '../../../server/rules-core/rules-engine/Engine';

var rules, metaData;

describe('Today\'s Forecasted Precip Accumulation Rule Test', () => {
  beforeEach(() => {
    metaData = {
      geocode: '42.89,-78.88',
      language: 'en-US',
      units: 'e'
    };

    rules = [
      {
        id: 'prcpacc',
        conditions: [
          [{
            fact: 'today.day.snowRange',
            operator: 'propExists'
          }],
          [{
            fact: 'today.day.precipAmt',
            operator: 'greaterThan',
            value: 0.5
          }],
          [{
            fact: 'today.night.snowRange',
            operator: 'propExists'
          }],
          [{
            fact: 'today.night.precipAmt',
            operator: 'greaterThan',
            value: 0.5
          }]
        ],
        datasources: ['dailyForecast']
      }
    ];

  });

  it('first rule passed', (done) => {
    let dailyForecast = {
      today: {
        validDate: '2016-11-17T07:00:00-0500',
        day: {
          dayPartName: 'Today',
          precipAmt: 0.5,
          snowRange: '5'
        },
        night: {
          dayPartName: 'Tonight',
          precipAmt: 0,
          snowRange: ''
        }
      }
    };
    let weatherData = {
      dailyForecast: dailyForecast
    };

    let factProvider = new FactProvider(metaData, weatherData);

    var rulesEngine = new Engine(rules);
    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      done();
    });

  });

  it('second rule passed', (done) => {
    let dailyForecast = {
      today: {
        validDate: '2016-11-17T07:00:00-0500',
        day: {
          dayPartName: 'Today',
          precipAmt: 0.6,
          snowRange: ''
        },
        night: {
          dayPartName: 'Tonight',
          precipAmt: 0,
          snowRange: ''
        }
      }
    };
    let weatherData = {
      dailyForecast: dailyForecast
    };

    let factProvider = new FactProvider(metaData, weatherData);

    var rulesEngine = new Engine(rules);
    rulesEngine.runRules(factProvider).then((res) => {
      expect(res[0].triggers.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('dailyForecast');
      expect(res[0].triggers[0].key).to.be.equals('today.day.precipAmt');
      expect(res[0].triggers[0].value).to.be.equals(dailyForecast.today.day.precipAmt);

      done();
    });

  });

  it('third rule passed', (done) => {
    let dailyForecast = {
      today: {
        validDate: '2016-11-17T07:00:00-0500',
        day: {
          dayPartName: 'Today',
          precipAmt: 0.5,
          snowRange: ''
        },
        night: {
          dayPartName: 'Tonight',
          precipAmt: 0,
          snowRange: '7'
        }
      }
    };
    let weatherData = {
      dailyForecast: dailyForecast
    };

    let factProvider = new FactProvider(metaData, weatherData);

    var rulesEngine = new Engine(rules);
    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      done();
    });

  });

  it('fourth rule passed', (done) => {
    let dailyForecast = {
      today: {
        validDate: '2016-11-17T07:00:00-0500',
        day: {
          dayPartName: 'Today',
          precipAmt: 0.5,
          snowRange: ''
        },
        night: {
          dayPartName: 'Tonight',
          precipAmt: 12,
          snowRange: ''
        }
      }
    };
    let weatherData = {
      dailyForecast: dailyForecast
    };

    let factProvider = new FactProvider(metaData, weatherData);

    var rulesEngine = new Engine(rules);
    rulesEngine.runRules(factProvider).then((res) => {
      expect(res[0].triggers.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('dailyForecast');
      expect(res[0].triggers[0].key).to.be.equals('today.night.precipAmt');
      expect(res[0].triggers[0].value).to.be.equals(dailyForecast.today.night.precipAmt);

      done();
    });

  });

});
