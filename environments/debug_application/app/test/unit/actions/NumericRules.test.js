import chai from 'chai';
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

import Engine from '../../../server/rules-core/rules-engine/Engine';
import FactProvider from '../../../server/rules-core/data-feader/FactProvider';

var rules, factProvider,
  meta = {
    language: 'en-US'
  };

describe('Numeric Rules Engine Tests', () => {
  beforeEach(() => {
    rules = {
      lessThan: [{
        conditions: [
          [{
            fact: 'temperature',
            operator: 'lessThan',
            value: 15
          }]
        ],
        datasources: ['observation']
      }],
      greaterThan: [{
        conditions: [
          [{
            fact: 'feelsLike',
            operator: 'greaterThan',
            value: 1
          }]
        ],
        datasources: ['observation']
      }],
      lessThanOrEqualTo: [{
        conditions: [
          [{
            fact: 'feelsLike',
            operator: 'lessThanOrEqualTo',
            value: 2
          }]
        ],
        datasources: ['observation']
      }],
      greaterThanOrEqualTo: [{
        conditions: [
          [{
            fact: 'feelsLike',
            operator: 'greaterThanOrEqualTo',
            value: 5
          }]
        ],
        datasources: ['observation']
      }],
      isEqualTo: [{
        conditions: [
          [{
            fact: 'temperature',
            operator: 'isEqualTo',
            value: 5
          }]
        ],
        datasources: ['observation']
      }],
      isNotEqualTo: [{
        conditions: [
          [{
            fact: 'temperature',
            operator: 'isNotEqualTo',
            value: 6
          }]
        ],
        datasources: ['observation']
      }]
    };

  });

  it('rules performance test', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 14,
      feelsLike: 0
    }});

    var allRules = [];
    for (var i = 0; i < 1000; i++) {
      allRules = allRules.concat(rules.lessThan);
    }

    var start = +new Date();

    var rulesEngine = new Engine(allRules);

    rulesEngine.runRules(factProvider).then((res) => {
      var end = +new Date();

      var diff = end - start; // time difference in milliseconds
      expect(diff).to.be.not.greaterThan(500);

      done();
    });


  });

  it('lessThan rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 14,
      feelsLike: 0
    }});


    var rulesEngine = new Engine(rules.lessThan);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('temperature');
      expect(res[0].triggers[0].value).to.be.equals(14);

      done();
    });


  });

  it('lessThan rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 15,
      feelsLike: 0
    }});

    var rulesEngine = new Engine(rules.lessThan);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('greaterThan rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 14,
      feelsLike: 2
    }});

    var rulesEngine = new Engine(rules.greaterThan);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('feelsLike');
      expect(res[0].triggers[0].value).to.be.equals(2);

      done();
    });

  });

  it('greaterThan rule does not pass', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 14,
      feelsLike: 0
    }});

    var rulesEngine = new Engine(rules.greaterThan);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('lessThanOrEqualTo rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 14,
      feelsLike: 2
    }});

    var rulesEngine = new Engine(rules.lessThanOrEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('feelsLike');
      expect(res[0].triggers[0].value).to.be.equals(2);

      done();
    });

  });

  it('lessThanOrEqualTo rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 14,
      feelsLike: 3
    }});

    var rulesEngine = new Engine(rules.lessThanOrEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('greaterThanOrEqualTo rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 14,
      feelsLike: 5
    }});


    var rulesEngine = new Engine(rules.greaterThanOrEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('feelsLike');
      expect(res[0].triggers[0].value).to.be.equals(5);

      done();
    });

  });

  it('greaterThanOrEqualTo rule does not passed', (done) => {

    factProvider = new FactProvider(meta, {observation: {
      temperature: 14,
      feelsLike: 4
    }});

    var rulesEngine = new Engine(rules.greaterThanOrEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('isEqualTo rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 5,
      feelsLike: 15
    }});

    var rulesEngine = new Engine(rules.isEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('temperature');
      expect(res[0].triggers[0].value).to.be.equals(5);

      done();
    });

  });

  it('isEqualTo rule does not passed', (done) => {

    factProvider = new FactProvider(meta, {observation: {
      temperature: 4,
      feelsLike: 15
    }});

    var rulesEngine = new Engine(rules.isEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('isNotEqualTo rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 5,
      feelsLike: 15
    }});

    var rulesEngine = new Engine(rules.isNotEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('temperature');
      expect(res[0].triggers[0].value).to.be.equals(5);

      done();
    });

  });

  it('isNotEqualTo rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 6,
      feelsLike: 15
    }});

    var rulesEngine = new Engine(rules.isNotEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

});
