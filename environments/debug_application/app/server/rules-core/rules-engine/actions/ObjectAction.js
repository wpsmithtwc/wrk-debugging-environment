
class ObjectAction {

  static runAction(condition, fact) {
    return ObjectAction[condition.operator].call(null, condition, fact);
  }

  static isObject(condition) {
    var result;

    switch (condition.operator) {
      case 'anyOfKeysWithValues':
      case 'anyOfKeysWithValue':
      case 'keyHasValue':
      case 'propExists':
        result = true;
        break;
      default:
        result = false;
    }

    return result;
  }

  static anyOfKeysWithValues(condition, fact) {
    var result = false;
    let trigger = {
      datasource: condition.datasource,
      key: condition.field,
    };
    let cVal = condition.getValue(fact);
    let keys = Object.keys(cVal);
    let key;

    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      if (condition.param1.indexOf(key) >= 0 && condition.param2.indexOf((cVal)[key]) >= 0) {
        result = true;

        trigger.value = {};
        trigger.value[key] = (cVal)[key];

        condition.setTriggerFull(trigger);

        break;
      }
    }

    return Promise.resolve(result);
  }

  static anyOfKeysWithValue(condition, fact) {
    var result = false;
    let trigger = {
      datasource: condition.datasource,
      key: condition.field,
    };
    let cVal = condition.getValue(fact);
    let keys = Object.keys(cVal);
    let key;

    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      if (condition.param1.indexOf(key) >= 0 && cVal[key] === condition.param2) {
        result = true;

        trigger.value = {};
        trigger.value[key] = cVal[key];

        condition.setTriggerFull(trigger);

        break;
      }
    }

    return Promise.resolve(result);
  }

  static keyHasValue(condition, fact) {
    var result = false;

    let trigger = {
      datasource: condition.datasource,
      key: condition.field,
    };
    let cVal = condition.getValue(fact);
    let keys = Object.keys(cVal);
    let key;

    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      if (condition.param1 === key && cVal[key] === condition.param2) {
        result = true;

        trigger.value = {};
        trigger.value[key] = cVal[key];

        condition.setTriggerFull(trigger);

        break;
      }
    }

    return Promise.resolve(result);
  }

  static propExists(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);


    if (cVal &&
      (Array.isArray(cVal) || (typeof cVal) === 'string') || (typeof cVal) === 'number' || (typeof cVal) === 'object') {
      result = true;

      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

}

export default ObjectAction;
