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
      anyOfKeysWithValue: [{
        conditions: [
          [{
            fact: 'phenomenaSignificance',
            operator: 'anyOfKeysWithValue',
            value: ['BZ', 'WS', 'LE', 'IS', 'EC', 'WC'],
            param2: 'W'
          }]
        ],
        datasources: ['alerts']
      }],
      keyHasValue: [{
        conditions: [
          [{
            fact: 'phenomenaSignificance',
            operator: 'keyHasValue',
            value: 'BZ',
            param2: 'W'
          }]
        ],
        datasources: ['alerts']
      }],
      anyOfKeysWithValues: [{
        conditions: [
          [{
            fact: 'phenomenaSignificance',
            operator: 'anyOfKeysWithValues',
            value: ['BZ', 'WS', 'LE', 'IS', 'EC', 'WC', 'GL'],
            param2: ['A', 'W']
          }]
        ],
        datasources: ['alerts']
      }]
    };
  });

  it('anyOfKeysWithValue rule passed', (done) => {
    factProvider = new FactProvider(meta, {alerts: {
      phenomenaSignificance: {
        'WI': 'Y',
        'BZ': 'W',
        'SC': 'Y'
      }
    }});

    var rulesEngine = new Engine(rules.anyOfKeysWithValue);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('alerts');
      expect(res[0].triggers[0].key).to.be.equals('phenomenaSignificance');
      expect(JSON.stringify(res[0].triggers[0].value)).to.be.equals(JSON.stringify({ BZ: 'W' }));

      done();
    });

  });

  it('anyOfKeysWithValue rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {alerts: {
      phenomenaSignificance: {
        'WI': 'Y',
        'GL': 'W',
        'SC': 'Y'
      }
    }});

    var rulesEngine = new Engine(rules.anyOfKeysWithValue);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('anyOfKeysWithValues rule passed', (done) => {
    factProvider = new FactProvider(meta, {alerts: {
      phenomenaSignificance: {
        'WI': 'Y',
        'BZ': 'W',
        'SC': 'Y'
      }
    }});

    var rulesEngine = new Engine(rules.anyOfKeysWithValues);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('alerts');
      expect(res[0].triggers[0].key).to.be.equals('phenomenaSignificance');
      expect(JSON.stringify(res[0].triggers[0].value)).to.be.equals(JSON.stringify({ BZ: 'W' }));

      done();
    });

  });

  it('keyHasValue rule passed', (done) => {
    factProvider = new FactProvider(meta, {alerts: {
      phenomenaSignificance: {
        'WI': 'Y',
        'BZ': 'W',
        'SC': 'Y'
      }
    }});

    var rulesEngine = new Engine(rules.keyHasValue);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('alerts');
      expect(res[0].triggers[0].key).to.be.equals('phenomenaSignificance');
      expect(JSON.stringify(res[0].triggers[0].value)).to.be.equals(JSON.stringify({ BZ: 'W' }));

      done();
    });

  });

  it('keyHasValue rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {alerts: {
      phenomenaSignificance: {
        'WI': 'Y',
        'BZ': 'D',
        'SC': 'Y'
      }
    }});

    var rulesEngine = new Engine(rules.keyHasValue);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });


});
