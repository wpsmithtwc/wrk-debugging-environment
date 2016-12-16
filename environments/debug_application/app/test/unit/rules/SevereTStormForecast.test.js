import chai from 'chai';
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

import DailyForecastLoader from '../../../server/rules-core/data-feader/loaders/DailyForecastLoader';
import FactProvider from '../../../server/rules-core/data-feader/FactProvider';
import RulesProvider from '../../../server/rules-core/definition-service/RulesProvider';

import Engine from '../../../server/rules-core/rules-engine/Engine';

var rules, dailyForecast, metaData;

describe('Severe T-Storm Forecast Rule Test', () => {
  beforeEach(() => {
    metaData = {
      geocode: '42.89,-78.88',
      language: 'en-US',
      units: 'e'
    };

    rules = [
      {
        id: 'tstorm',
        conditions: [
          [{
            fact: 'day.thunderEnum',
            operator: 'isOneOf',
            value: [3, 4, 5]
          }],
          [{
            fact: 'night.thunderEnum',
            operator: 'isOneOf',
            value: [3, 4, 5]
          }]
        ],
        datasources: ['dailyForecast'],
        entriesToCheck: 3
      }
    ];
  });

  xit('shouldn\'t match the rule', (done) => {
    let weatherData = {
      dailyForecast: [
        {
          "day": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          },
          "night": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          }
        },
        {
          "day": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          },
          "night": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          }
        },
        {
          "day": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          },
          "night": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          }
        }
      ]
    };

    let factProvider = new FactProvider(metaData, weatherData);

    var rulesEngine = new Engine(rules);

    rulesEngine.runRules(factProvider).then((result) => {
      result.length === 0 && done();
    });

  });

  xit('should match the rule', (done) => {
    let weatherData = {
      dailyForecast: [
        {
          "day": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          },
          "night": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          }
        },
        {
          "day": {
            "thunderEnum": 3,
            "thunderEnumPhrase": "Thunderstorm"
          },
          "night": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          }
        },
        {
          "day": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          },
          "night": {
            "thunderEnum": 0,
            "thunderEnumPhrase": "No thunder"
          }
        }
      ]
    };

    let factProvider = new FactProvider(metaData, weatherData);



    var rulesEngine = new Engine(rules);


    rulesEngine.runRules(factProvider).then((result) => {
      result.length !== 0 && done();
    });

  });

});
