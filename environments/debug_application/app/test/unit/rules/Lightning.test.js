import chai from 'chai';
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

import LightningLoader from '../../../server/rules-core/data-feader/loaders/LightningLoader';
import FactProvider from '../../../server/rules-core/data-feader/FactProvider';
import RulesProvider from '../../../server/rules-core/definition-service/RulesProvider';

import Engine from '../../../server/rules-core/rules-engine/Engine';

var rules, lightning, metaData;

describe('Lightning Rule Test', () => {
  beforeEach(() => {
    metaData = {
      geocode: '42.89,-78.88',
      language: 'en-US',
      units: 'e'
    };

    rules = [{
      id: 'rtln',
      limits: {
        languages: ['en-US']
      },
      conditions: [
        [{
          fact: 'distance',
          operator: 'lessThan',
          value: 5
        },
          {
            fact: 'strikeTime',
            operator: 'propExists'
          }]
      ],
      datasources: ['lightning'],
      response: {
        icon: '/test/icon.png'
      }
    }
    ];

    lightning =
      { strikeTime:
        [ '2016-11-14T21:24:45.569-06:00',
          '2016-11-14T21:24:45.700-06:00',
          '2016-11-14T21:24:45.659-06:00',
          '2016-11-14T21:24:45.337-06:00',
          '2016-11-14T21:24:45.276-06:00' ],
        latitude: [ 36.4917394, 36.491924, 36.4922283, 36.484647, 36.5055297 ],
        longitude: [ -89.9447774, -89.9447068, -89.9447039, -89.9714861, -89.9905773 ],
        distance: [ 4.36, 4.37, 4.39, 5.04, 6.78 ] } ;

  });


  it('all 3 rules passed', (done) => {
    let weatherData = {
      lightning: LightningLoader.parseResponseData(lightning)
    };

    let factProvider = new FactProvider(metaData, weatherData);

    var rulesEngine = new Engine(rules);
    rulesEngine.runRules(factProvider).then((result) => {
      console.log(result);

      done();
    });

  });


});
