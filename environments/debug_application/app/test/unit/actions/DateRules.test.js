import chai from 'chai';
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

import Engine from '../../../server/rules-core/rules-engine/Engine';
import FactProvider from '../../../server/rules-core/data-feader/FactProvider';

var rules, factProvider,
  meta = {
    language: 'en-US'
  };

describe('Date Rules Engine Tests', () => {
  beforeEach(() => {
    rules = {
      timeFromNow: [{
        conditions: [
          [{
            fact: 'phenomenaEffectiveTime',
            operator: 'timeFromNow',
            value: '12h'
          }]
        ],
        datasources: ['dateTime']
      }],
      timePassed: [{
        conditions: [
          [{
            fact: 'dateToTest',
            operator: 'timePassed'
          }]
        ],
        datasources: ['dateTime']
      }],
      timeInFuture: [{
        conditions: [
          [{
            fact: 'dateToTest',
            operator: 'timeInFuture'
          }]
        ],
        datasources: ['dateTime']
      }],
      timePassedAfterHour: [{
        conditions: [
          [{
            fact: 'dateToTest',
            operator: 'timePassedAfterHour',
            value: 10
          }]
        ],
        datasources: ['dateTime']
      }],
      isDayOneOf: [{
        conditions: [
          [{
            fact: 'datetime',
            operator: 'isDayOneOf',
            value: ['Wed', 'Thu', 'Fri']
          }]
        ],
        datasources: ['dateTime']
      }]
    };
  });

  it('timeFromNow rule passed', (done) => {
    factProvider = new FactProvider(meta, {dateTime: {
        datetime: '2016-11-11T11:00:00-07:00',
        phenomenaEffectiveTime: {
          '2016-11-11T12:00:00-07:00': 'W'
        }
      }
    });

    var rulesEngine = new Engine(rules.timeFromNow);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);

      expect(res[0].triggers[0].datasource).to.be.equals('dateTime');
      expect(res[0].triggers[0].key).to.be.equals('phenomenaEffectiveTime');
      expect(res[0].triggers[0].value.toString()).to.be.equals((new Date('2016-11-11T12:00:00-07:00')).toString());

      done();
    });

  });

  it('timeFromNow rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {dateTime: {
      datetime: '2016-11-11T11:00:00-07:00',
      phenomenaEffectiveTime: {
        '2016-11-12T12:00:00-07:00': 'W'
      }
    }
    });

    var rulesEngine = new Engine(rules.timeFromNow);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('timePassed rule did not pass', (done) => {
    factProvider = new FactProvider(meta, {dateTime: {
      dateToTest: '2016-11-11T11:00:00-07:00',
      datetime: '2016-11-10T12:00:00-07:00'
    }
    });

    var rulesEngine = new Engine(rules.timePassed);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('timePassed rule passed', (done) => {
    factProvider = new FactProvider(meta, {dateTime: {
      dateToTest: '2016-11-11T11:00:00-07:00',
      datetime: '2016-11-13T12:00:00-07:00'
    }
    });

    var rulesEngine = new Engine(rules.timePassed);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).not.to.be.equals(0);

      expect(res[0].triggers[0].datasource).to.be.equals('dateTime');
      expect(res[0].triggers[0].key).to.be.equals('dateToTest');

      done();
    });

  });

  it('timeInFuture rule did not pass', (done) => {
    factProvider = new FactProvider(meta, {dateTime: {
      dateToTest: '2016-11-10T11:00:00-07:00',
      datetime: '2016-11-11T12:00:00-07:00'
    }
    });

    var rulesEngine = new Engine(rules.timeInFuture);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('timeInFuture rule passed', (done) => {
    factProvider = new FactProvider(meta, {dateTime: {
      dateToTest: '2016-11-13T11:00:00-07:00',
      datetime: '2016-11-11T12:00:00-07:00'
    }
    });

    var rulesEngine = new Engine(rules.timeInFuture);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).not.to.be.equals(0);

      expect(res[0].triggers[0].datasource).to.be.equals('dateTime');
      expect(res[0].triggers[0].key).to.be.equals('dateToTest');

      done();
    });

  });

  it('timePassedAfterHour rule did not pass', (done) => {
    factProvider = new FactProvider(meta, {dateTime: {
      dateToTest: '2016-11-12T15:00:00-07:00',
      datetime: '2016-11-11T09:00:00-07:00'
    }
    });

    var rulesEngine = new Engine(rules.timePassedAfterHour);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

  it('timePassedAfterHour rule passed', (done) => {
    factProvider = new FactProvider(meta, {dateTime: {
      dateToTest: '2016-11-10T12:00:00-07:00',
      datetime: '2016-11-11T12:00:00-07:00'
    }
    });

    var rulesEngine = new Engine(rules.timePassedAfterHour);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).not.to.be.equals(0);

      expect(res[0].triggers[0].datasource).to.be.equals('dateTime');
      expect(res[0].triggers[0].key).to.be.equals('dateToTest');

      done();
    });

  });

  it('isDayOneOf rule passed', (done) => {
    factProvider = new FactProvider(meta, {dateTime: {
      datetime: '2016-11-24T11:00:00-07:00'
    }
    });

    var rulesEngine = new Engine(rules.isDayOneOf);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(1);
      expect(res[0].triggers[0].datasource).to.be.equals('dateTime');
      expect(res[0].triggers[0].value).to.be.equals('2016-11-24T11:00:00-07:00');

      done();
    });

  });

  it('isDayOneOf rule does not passed', (done) => {
    factProvider = new FactProvider(meta, {dateTime: {
      datetime: '2016-11-22T11:00:00-07:00'
    }
    });

    var rulesEngine = new Engine(rules.isDayOneOf);

    rulesEngine.runRules(factProvider).then((res) => {
      expect(res.length).to.be.equals(0);

      done();
    });

  });

});
