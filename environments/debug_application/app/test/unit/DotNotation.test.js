import chai from 'chai';
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

import FactProvider from '../../server/rules-core/data-feader/FactProvider';

import Engine from '../../server/rules-core/rules-engine/Engine';

var rules, dailyForecast, metaData;

describe('Dot Notation Test', () => {
  beforeEach(() => {
    metaData = {
      geocode: '42.89,-78.88',
      language: 'en-US',
      units: 'e'
    };

    rules = [{
      id: 'fcst',
      conditions: [
        [{
          fact: 'today.sunrise.time',
          operator: 'lessThan',
          value: 5
        }]
      ],
      datasources: ['dailyForecast']
    }
    ];

    dailyForecast =
    { today: {sunrise: {time: 3}} } ;

  });


  it('property access via ', (done) => {
    let weatherData = {
      dailyForecast: dailyForecast
    };

    let factProvider = new FactProvider(metaData, weatherData);

    var rulesEngine = new Engine(rules);
    rulesEngine.runRules(factProvider).then((res) => {
      expect(res[0].triggers.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('dailyForecast');
      expect(res[0].triggers[0].key).to.be.equals('today.sunrise.time');
      expect(res[0].triggers[0].value).to.be.equals(3);

      done();
    });

  });


});
