import chai from 'chai';
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

import Engine from '../../../server/rules-core/rules-engine/Engine';
import FactProvider from '../../../server/rules-core/data-feader/FactProvider';

var rules, factProvider,
  meta = {
    language: 'en-US'
  };

describe('String Rules Engine Tests', () => {
  beforeEach(() => {
    rules = {
      isStringEqualTo: [{
        conditions: [
          [{
            fact: 'temperature',
            operator: 'isStringEqualTo',
            value: 'pretty warm'
          }]
        ],
        datasources: ['observation']
      }],
      isStringNotEqualTo: [{
        conditions: [
          [{
            fact: 'feelsLike',
            operator: 'isStringNotEqualTo',
            value: 'pretty warm'
          }]
        ],
        datasources: ['observation']
      }],
      startsWith: [{
        conditions: [
          [{
            fact: 'feelsLike',
            operator: 'startsWith',
            value: 'quite warm'
          }]
        ],
        datasources: ['observation']
      }],
      doesNotStartWith: [{
        conditions: [
          [{
            fact: 'feelsLike',
            operator: 'doesNotStartWith',
            value: 'quite rainy'
          }]
        ],
        datasources: ['observation']
      }],
      endsWith: [{
        conditions: [
          [{
            fact: 'temperature',
            operator: 'endsWith',
            value: 'cold rain'
          }]
        ],
        datasources: ['observation']
      }],
      doesNotEndWith: [{
        conditions: [
          [{
            fact: 'temperature',
            operator: 'doesNotEndWith',
            value: 'cold rain'
          }]
        ],
        datasources: ['observation']
      }],
      contains: [{
        conditions: [
          [{
            fact: 'temperature',
            operator: 'contains',
            value: 'It is cold out there!'
          }]
        ],
        datasources: ['observation']
      }],
      doesNotContain: [{
        conditions: [
          [{
            fact: 'temperature',
            operator: 'doesNotContain',
            value: 'It is cold out there!'
          }]
        ],
        datasources: ['observation']
      }]
    };

});

  it('isStringEqualTo rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'pretty warm',
      feelsLike: 0
    }});

    var rulesEngine = new Engine(rules.isStringEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('temperature');
      expect(res[0].triggers[0].value).to.be.equals('pretty warm');

      done();
    });

  });

  it('isStringEqualTo rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'pretty cold',
      feelsLike: 0
    }});

    var rulesEngine = new Engine(rules.isStringEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('isStringNotEqualTo rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 17,
      feelsLike: 'pretty cold'
    }});

    var rulesEngine = new Engine(rules.isStringNotEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('feelsLike');
      expect(res[0].triggers[0].value).to.be.equals('pretty cold');

      done();
    });

  });

  it('isStringNotEqualTo rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 15,
      feelsLike: 'pretty warm'
    }});

    var rulesEngine = new Engine(rules.isStringNotEqualTo);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('startsWith rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 15,
      feelsLike: 'quite'
    }});

    var rulesEngine = new Engine(rules.startsWith);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('feelsLike');
      expect(res[0].triggers[0].value).to.be.equals('quite');

      done();
    });

  });

  it('startsWith rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 15,
      feelsLike: 'pretty'
    }});

    var rulesEngine = new Engine(rules.startsWith);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('doesNotStartWith rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 15,
      feelsLike: 'very'
    }});

    var rulesEngine = new Engine(rules.doesNotStartWith);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('feelsLike');
      expect(res[0].triggers[0].value).to.be.equals('very');

      done();
    });

  });

  it('doesNotStartWith rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 15,
      feelsLike: 'quite'
    }});

    var rulesEngine = new Engine(rules.doesNotStartWith);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('endsWith rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'rain',
      feelsLike: 5
    }});

    var rulesEngine = new Engine(rules.endsWith);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('temperature');
      expect(res[0].triggers[0].value).to.be.equals('rain');

      done();
    });

  });

  it('endsWith rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'cold',
      feelsLike: 5
    }});

    var rulesEngine = new Engine(rules.endsWith);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('doesNotEndWith rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'cold',
      feelsLike: 5
    }});

    var rulesEngine = new Engine(rules.doesNotEndWith);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('temperature');
      expect(res[0].triggers[0].value).to.be.equals('cold');

      done();
    });

  });

  it('doesNotEndWith rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'rain',
      feelsLike: 5
    }});

    var rulesEngine = new Engine(rules.doesNotEndWith);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('contains rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'It is cold',
      feelsLike: 5
    }});

    var rulesEngine = new Engine(rules.contains);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('temperature');
      expect(res[0].triggers[0].value).to.be.equals('It is cold');

      done();
    });

  });

  it('contains rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'It is hot',
      feelsLike: 5
    }});

    var rulesEngine = new Engine(rules.contains);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('doesNotContain rule passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'It is warm',
      feelsLike: 5
    }});

    var rulesEngine = new Engine(rules.doesNotContain);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('observation');
      expect(res[0].triggers[0].key).to.be.equals('temperature');
      expect(res[0].triggers[0].value).to.be.equals('It is warm');

      done();
    });

  });

  it('doesNotContain rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {observation: {
      temperature: 'It is cold',
      feelsLike: 5
    }});

    var rulesEngine = new Engine(rules.doesNotContain);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

});
