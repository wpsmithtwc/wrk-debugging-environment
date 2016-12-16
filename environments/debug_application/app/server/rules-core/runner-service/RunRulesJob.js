import FactProvider from '../data-feader/FactProvider';
import RulesProvider from '../definition-service/RulesProvider';

import Engine from '../rules-engine/Engine';

var debug = require('debug')('twc:RunRulesJob');

class RunRulesJob {

  constructor(uiData) {
    this.metaData = uiData.meta;
    this.startTime = (new Date()).getTime();

    this.factProvider = new FactProvider(this.metaData, {});
    this.ruleProvider = new RulesProvider(this.metaData);

    this.resultsLight = [];

    debug(`Request ${this.startTime} -> ${JSON.stringify(this.metaData)}`);
  }

  async runRules() {
    let results;
    let timeMeta;

    try {
      await Promise.all([
        this.ruleProvider.setupPriorities(),
        this.factProvider.setupLocation()
      ]);

      let rules = await this.ruleProvider.getRules();
      let maxRulesPassed = this.ruleProvider.getResponseLimit();
      let rulesEngine = new Engine(rules);

      results = await rulesEngine.runRules(this.factProvider, maxRulesPassed);
      this.resultsLight = rulesEngine.resultsLight;

      timeMeta = await this.getDateTime();
    } catch (err) {
      debug(`Request ${this.startTime} failed -> ${err}`);

      return Promise.reject(err);
    }

    const execTime = (new Date()).getTime() - this.startTime;

    debug(`Request ${this.startTime} processed in ${execTime} ms`);

    return Promise.resolve([
      execTime,
      this.metaData,
      timeMeta,
      results
    ]);
  }

  getResponseLight() {
    return [
      this.metaData,
      this.resultsLight
    ];
  }

  async getDateTime() {
    let facts = await this.factProvider.getFact(['dateTime']);
    let nowTime = facts.data.dateTime.datetime;
    let nowDate = new Date(nowTime);
    let tomorrowTime = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000);
    let weekendTime = new Date(nowTime);
    let day = nowDate.getDay();

    if (day > 0 && day < 6) {
      weekendTime = new Date(nowDate.getTime() + (6 - day) * 24 * 60 * 60 * 1000);
    }

    weekendTime.setHours(0);
    weekendTime.setMinutes(0);

    return {
      now: nowTime,
      tomorrow: tomorrowTime.toString(),
      weekend: weekendTime.toString()
    };
  }
}

export default RunRulesJob;
