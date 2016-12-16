import Rule from './Rule';

class Engine {

  constructor(rules) {
    this.rules = [];
    rules.forEach((rule) => {
      this.rules.push(new Rule(rule));
    });

    this.resultsLight = [];
  }

  async runRules(factProvider, maxRulesPassed) {
    let rulesPassedCount = 0;
    let results = [];
    let ruleRes;

    await this.loadData(factProvider);

    let rule;

    for (let i = 0; i < this.rules.length; i++) {
      rule = this.rules[i];

      ruleRes = await rule.runRule(factProvider);
      if (!!ruleRes) {
        results.push(rule.getResponse());
        this.resultsLight.push(rule.getResponseLight());

        rulesPassedCount++;
        if (rulesPassedCount === maxRulesPassed) {
          break;
        }
      }
    }

    return results;
  }

  async loadData(factProvider) {
    var dataSourceMap = {};

    this.rules.forEach((rule) => {
      if (!!rule.dataSources && !rule.static) {
        rule.dataSources.forEach((datasource) => {
          dataSourceMap[datasource] = true;
        });
      }
    });

    let dataPromises = [];

    Object.keys(dataSourceMap).forEach((datasource) => {
      dataPromises.push(factProvider.getFact([datasource]));
    });

    await Promise.all(dataPromises);

    return Promise.resolve(true);
  }

}

export default Engine;
