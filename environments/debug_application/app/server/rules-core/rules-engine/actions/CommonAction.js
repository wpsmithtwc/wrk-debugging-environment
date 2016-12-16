
class CommonAction {

  static runAction(condition, fact) {
    return CommonAction[condition.operator].call(null, condition, fact);
  }

  static isCommon(condition) {
    var result;

    switch (condition.operator) {
      case 'isOneOf':
        result = true;
        break;
      default:
        result = false;
    }

    return result;
  }

  static isOneOf(condition, fact) {
    let result = false;
    let value = condition.getValue(fact);

    if ((condition.param1).indexOf(value) !== -1) {
      result = true;
      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }
}

export default CommonAction;
