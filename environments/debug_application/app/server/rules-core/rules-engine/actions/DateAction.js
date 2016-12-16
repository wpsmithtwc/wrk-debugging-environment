
class DateAction {

  static runAction(condition, fact) {
    return DateAction[condition.operator].call(null, condition, fact);
  }

  static isDate(condition) {
    var result;

    switch (condition.operator) {
      case 'timeFromNow':
      case 'timePassed':
      case 'timeInFuture':
      case 'timePassedAfterHour':
      case 'isDayOneOf':
        result = true;
        break;
      default:
        result = false;
    }

    return result;
  }

  static parseTimeString(stringToParse) {
    let parsedDigits = '';
    let timeUnit = '';
    let parsedItem;

    for (let i = 0; i < stringToParse.length; i++) {
      parsedItem = parseInt(stringToParse[i], 10);
      if (typeof parsedItem === 'number' && !isNaN(parsedItem)) {
        parsedDigits += stringToParse[i];
      } else {
        timeUnit += stringToParse[i];
      }
    }

    return [parseInt(parsedDigits, 10), timeUnit];
  }

  static timeFromNow(condition, fact) {
    let result = false;
    let currentTime = new Date(condition.datetime);
    let limitTime;
    let timeUnit = DateAction.parseTimeString(condition.param1)[1];
    let timeValue = DateAction.parseTimeString(condition.param1)[0];
    let effectiveTime;

    if (timeUnit === 'm') {
      limitTime = new Date(currentTime.getTime() + timeValue * 60000);
    } else if (timeUnit === 'h') {
      limitTime = new Date(currentTime.getTime() + timeValue * 3600000);
    }

    let cVal = condition.getValue(fact);
    let keys = Object.keys(cVal);
    let key;

    for (let i = 0; i < keys.length; i++) {
      key = keys[i];
      effectiveTime = new Date(key);

      if (effectiveTime > currentTime && effectiveTime < limitTime) {
        result = true;
        break;
      }
    }

    condition.setTriggerFull({
      datasource: condition.datasource,
      key: condition.field,
      value: effectiveTime
    });

    return Promise.resolve(result);
  }

  static timePassed(condition, fact) {
    let result = false;
    let currentTime = new Date(condition.datetime);
    const cVal = condition.getValue(fact);
    const dateVal = new Date(cVal);

    if (currentTime > dateVal) {
      result = true;

      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static timeInFuture(condition, fact) {
    let result = false;
    let currentTime = new Date(condition.datetime);

    const cVal = condition.getValue(fact);
    const dateVal = new Date(cVal);

    if (currentTime < dateVal) {
      result = true;

      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static timePassedAfterHour(condition, fact) {
    let result = false;
    let currentTime = new Date(condition.datetime);
    const cVal = condition.getValue(fact);
    const dateVal = new Date(cVal);

    dateVal.setHours(condition.param1);
    dateVal.setMinutes(0);

    if (currentTime > dateVal) {
      result = true;

      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

  static isDayOneOf(condition, fact) {
    const weekDay = [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ];

    let result = false;
    let currentTime = new Date(condition.datetime);
    let currentDay = weekDay[currentTime.getDay()];

    if (condition.param1.indexOf(currentDay) > -1) {
      result = true;

      condition.setTrigger(fact);
    }

    return Promise.resolve(result);
  }

}

export default DateAction;
