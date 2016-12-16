import ActionRunner from './ActionRunner';

class Condition {

  constructor(obj) {
    this.field = obj.fact;
    this.operator = obj.operator;
    this.param1 = obj.value;
    this.param2 = obj.param2;
    this.daysToCheck = obj.daysToCheck;

    this.hasNestedField = this.field.indexOf('.') > 0;
    this.subFields = this.hasNestedField ? this.field.split('.') : [];

    this.datasource = null;
    this.facts = null;

    this.trigger = null;
    this.triggerLight = null;

    this.datetime = null;
  }

  checkCondition(facts, dataSources, entriesToCheck) {
    this.setParamsForUnits(facts);
    this.findDataSourceAndFact(facts.data, dataSources);

    if (!this.isValid()) {
      this.findDataSourceAndFact(facts.aliases, dataSources);
    }

    this.datetime = !!facts.data.dateTime ? facts.data.dateTime.datetime : null;

    return ActionRunner.runAction(this, entriesToCheck);
  }

  setParamsForUnits(facts) {
    if (!!this.param1 && this.param1.e !== undefined && this.param1.m !== undefined) {
      this.param1 = this.param1[facts.meta.units];
    }

    if (!!this.param2 && this.param2.e !== undefined && this.param2.m !== undefined) {
      this.param2 = this.param2[facts.meta.units];
    }
  }

  getValue(fact) {
    let cValue = null;

    if (this.hasNestedField) {
      cValue = fact;
      for (let i = 0; i < this.subFields.length; i++) {
        cValue = cValue[this.subFields[i]];

        if (!cValue) {
          break;
        }
      }
    } else if (fact[this.field] !== undefined) {
      cValue = fact[this.field];
    }

    return cValue;
  }

  setTrigger(fact) {
    const val = this.getValue(fact);

    this.trigger = {
      datasource: this.datasource,
      key: this.field,
      value: val,
      data: fact
    };

    this.triggerLight = {
      datasource: this.datasource,
      key: this.field,
      value: val
    };

    if (this.datasource === 'dateTime') {
      delete this.triggerLight.value;
    }
  }

  setTriggerFull(trigger) {
    this.trigger = trigger;
  }

  getTrigger() {
    return this.trigger;
  }

  getTriggerLight() {
    return this.triggerLight;
  }

  findDataSourceAndFact(facts, dataSources) {
    let cValue;
    let datasource = null;
    let ds;

    for (let i = 0; i < dataSources.length; i++) {
      ds = dataSources[i];
      cValue = null;

      if (!!facts[ds]) {
        if (this.hasNestedField) {
          cValue = Array.isArray(facts[ds]) ? facts[ds][0] : facts[ds];
          for (let j = 0; j < this.subFields.length; j++) {
            cValue = cValue[this.subFields[j]];

            if (!cValue) {
              break;
            }
          }
        } else {
          cValue = Array.isArray(facts[ds]) && facts[ds].length > 0 ?
            facts[ds][0][this.field] : facts[ds][this.field];
        }

        if (typeof cValue !== 'undefined' && cValue !== null) {
          datasource = ds;
          break;
        }
      }
    }

    if (!!datasource) {
      this.datasource = datasource;
      this.facts = Array.isArray(facts[datasource]) ? facts[datasource] : [facts[datasource]];
    }
  }

  isValid() {
    return !!this.datasource && !!this.facts;
  }

}

export default Condition;
