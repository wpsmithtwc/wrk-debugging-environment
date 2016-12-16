import chai from 'chai';
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

import RulesProvider from '../../server/rules-core/definition-service/RulesProvider';

var rules, loader, metaData;

describe('Base Rules Loader Test', () => {
  beforeEach(() => {
    loader = new RulesProvider();


    metaData = {
      geocode: '42.89,-78.88',
      language: 'en-US',
      units: 'e'
    };

    rules = [{
      limits: {
        languages: ['en-US']
      },
      conditions: [
        [{
          fact: 'temperature',
          operator: 'lessThan',
          value: 15
        }]
      ],
      datasources: ['observation'],
      msg: 'It is a nice weather!'
    }, {
      conditions: [
        [{
          fact: 'feelsLike',
          operator: 'greaterThan',
          value: 1
        }]
      ],
      datasources: ['observation'],
      response: {
        desc: 'It is a nice weather!'
      }
    },
      {
        conditions: [
          [{
            fact: 'phenomenaSignificance',
            operator: 'anyOfKeysWithValue',
            value: ['BZ', 'WS', 'LE', 'IS', 'EC', 'WC', 'GL'],
            param2: 'W'
          }]
        ],
        datasources: ['alerts'],
        response: {
          desc: 'Alert for Snow'
        }
      }]
  });


  it('all 3 rules passed', (done) => {

    loader.processDefinition(rules, metaData).then((filteredRules) => {
      expect(filteredRules.length).to.be.equals(3);

      done();
    });

  });

  it('only two rules passed', (done) => {

    metaData.language = 'es-ES';

    loader.processDefinition(rules, metaData).then((filteredRules) => {
      expect(filteredRules.length).to.be.equals(2);

      done();
    });

  });


});
