
class NumericAction {

  static runAction(condition, fact) {
    return NumericAction[condition.operator].call(null, condition, fact);
  }

  static isNumeric(condition) {
    let result = false;

    switch (condition.operator) {
      case 'lessThan':
      case 'lessThanOrEqualTo':
      case 'greaterThan':
      case 'greaterThanOrEqualTo':
      case 'isEqualTo':
      case 'isNotEqualTo':
        result = true;
        break;
      default:
        result = false;
        break;
    }

    return result;
  }

  static lessThan(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (Array.isArray(cVal)) {
      for (let i = 0; i < cVal.length; i++) {
        if (cVal[i] < condition.param1) {
          result = true;

          condition.setTriggerFull({
            datasource: condition.datasource,
            key: condition.field,
            value: cVal[i]
          });

          break;
        }
      }
    } else if (cVal < condition.param1) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static lessThanOrEqualTo(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (cVal <= condition.param1) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static greaterThan(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (cVal > condition.param1) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static greaterThanOrEqualTo(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (cVal >= condition.param1) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static isEqualTo(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (cVal === condition.param1) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static isNotEqualTo(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (cVal !== condition.param1) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

}

export default NumericAction;
