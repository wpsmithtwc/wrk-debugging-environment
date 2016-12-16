import ConditionSet from './ConditionSet';
import StaticCondition from './StaticCondition';

class Rule {

  constructor(ruleObj) {
    this.id = ruleObj.id;
    this.conditionSets = [];
    if (!!ruleObj.conditions) {
      ruleObj.conditions.forEach((condition) => {
        this.conditionSets.push(new ConditionSet(condition));
      });
    }

    this.response = ruleObj.response;
    this.dataSources = ruleObj.datasources;
    this.entriesToCheck = ruleObj.entriesToCheck;

    this.static = ruleObj.static;

    this.triggers = [];
    this.triggersLight = [];
    this.factProvider = null;
  }

  async runRule(factProvider) {
    this.factProvider = factProvider;
    let result = false;
    let facts;

    if (!!this.dataSources) {
      facts = await (!!this.static ?
        factProvider.getStaticFact(this.dataSources, this.static) :
        factProvider.getFact(this.dataSources));
    }

    if (!!this.static) {
      let staticCond = new StaticCondition(!!this.dataSources);

      result = staticCond.run(facts);

      this.processConditionResult(staticCond);
    } else {
      let conditionSet;

      for (let i = 0; i < this.conditionSets.length; i++) {
        conditionSet = this.conditionSets[i];

        result = result || await conditionSet.runConditionSet(facts, this.dataSources, this.entriesToCheck);

        this.processConditionResult(conditionSet);
      }
    }

    return result;
  }

  processConditionResult(condition) {
    if (condition.isPassed) {
      this.triggers = this.triggers.concat(condition.triggers);
      this.triggersLight = this.triggersLight.concat(condition.triggersLight);
    }
  }

  getResponse() {
    return {
      ruleId: this.id,
      triggers: this.triggers
    };
  }

  getResponseLight() {
    return {
      ruleId: this.id,
      triggers: this.triggersLight
    };
  }

}

export default Rule;
