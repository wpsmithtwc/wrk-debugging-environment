import RulesStorage from './RulesStorage';

class RulesProvider {

  constructor(metaData) {
    this.metaData = metaData;
    this.priorities = [];
    this.maxRulesPassed = 0;
  }

  async getRules() {
    let composedRules = await RulesStorage.getRules(this.metaData, this.priorities);
    let rawRules = RulesProvider.prioritizedRules(this.priorities, composedRules);

    return this.processDefinition(rawRules, this.metaData);
  }

  async setupPriorities() {
    var priorities = await RulesStorage.getPriorities(this.metaData);

    this.priorities = priorities[0].priority;
    this.maxRulesPassed = priorities[0].responseLimit;
  }

  getResponseLimit() {
    return this.maxRulesPassed;
  }

  static prioritizedRules(priorities, rulesToSort) {
    var result = [];

    priorities.forEach((entry) => {
      rulesToSort.forEach((rule) => {
        if (rule.id === entry) {
          result.push(rule);
        }
      });
    });

    return result;
  }

  processDefinition(rawRules, params = {}) {
    var filteredRules = [];

    rawRules.forEach((rule) => {
      if (this.isRulePassed(rule, params)) {
        filteredRules.push(rule);
      }
    });

    return Promise.resolve(filteredRules);
  }

  isRulePassed(rule, params = {}) {
    if (!!rule.limits) {

      if (!!rule.limits.languages && rule.limits.languages.indexOf(params.language) < 0) {
        return false;
      }

    }

    return true;
  }

}

export default RulesProvider;
