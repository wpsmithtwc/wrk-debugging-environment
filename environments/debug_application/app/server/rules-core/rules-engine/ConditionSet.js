import Condition from './Condition';

class ConditionSet {

  constructor(conditions) {
    this.conditions = [];
    conditions.forEach((condition) => {
      this.conditions.push(new Condition(condition));
    });
    this.triggers = [];
    this.triggersLight = [];
    this.isPassed = false;
  }

  async runConditionSet(facts, dataSources, entriesToCheck) {
    for (let i = 0; i < this.conditions.length; i++) {
      this.isPassed = await this.conditions[i].checkCondition(facts, dataSources, entriesToCheck);

      if (!this.isPassed) {
        break;
      }

      this.triggers.push(this.conditions[i].getTrigger());
      this.triggersLight.push(this.conditions[i].getTriggerLight());
    }

    return this.isPassed;
  }

}

export default ConditionSet;
