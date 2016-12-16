import chai from 'chai';
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

import Engine from '../../../server/rules-core/rules-engine/Engine';
import FactProvider from '../../../server/rules-core/data-feader/FactProvider';

var rules, factProvider,
  meta = {
    language: 'en-US'
  };

describe('Common Rules Engine Tests', () => {
  beforeEach(() => {
    rules = {
      isOneOf: [{
        conditions: [
          [{
            fact: 'temperature',
            operator: 'isOneOf',
            value: ['BZ', 'SZ', 'AZ']
          }]
        ],
        datasources: ['observation']
      }]
    };
  });


  it('isOneOf rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'BZ'
    }});

    var rulesEngine = new Engine(rules.isOneOf);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);
      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('temperature');
      expect(res[0].triggers[0].value).to.be.equals('BZ');

      done();
    });

  });

  it('isOneOf rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'DA'
    }});

    var rulesEngine = new Engine(rules.isOneOf);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });


});
