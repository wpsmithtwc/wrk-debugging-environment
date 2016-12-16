
class StringAction {

  static runAction(condition, fact) {
    return StringAction[condition.operator].call(null, condition, fact);
  }

  static isString(condition) {
    var result;

    switch (condition.operator) {
      case 'isStringEqualTo':
      case 'isStringNotEqualTo':
      case 'startsWith':
      case 'doesNotStartWith':
      case 'endsWith':
      case 'doesNotEndWith':
      case 'contains':
      case 'doesNotContain':
      case 'matchesWildcard':
      case 'doesNotMatchWildcard':
        result = true;
        break;
      default:
        result = false;
    }

    return result;
  }

  static isStringEqualTo(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (cVal === condition.param1) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static isStringNotEqualTo(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (cVal !== condition.param1) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static startsWith(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (condition.param1.startsWith(cVal)) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static doesNotStartWith(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (!(condition.param1.startsWith(cVal))) {
      result = true;

      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static endsWith(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (condition.param1.endsWith(cVal)) {
      result = true;

      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static doesNotEndWith(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (!(condition.param1.endsWith(cVal))) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static contains(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (condition.param1.includes(cVal)) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static doesNotContain(condition, fact) {
    var result = false;
    let cVal = condition.getValue(fact);

    if (!(condition.param1.includes(cVal))) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

}

export default StringAction;
