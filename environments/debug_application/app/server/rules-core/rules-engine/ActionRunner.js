import NumericAction from './actions/NumericAction';
import StringAction from './actions/StringAction';
import CommonAction from './actions/CommonAction';
import ObjectAction from './actions/ObjectAction';
import DateAction from './actions/DateAction';

class ActionRunner {

  static async runAction(condition, entriesToCheck) {
    let actionToInvoke = ActionRunner.getConditionAction(condition);
    let result;

    if (condition.isValid() && !!actionToInvoke) {
      let idx = 0;

      for (let i = 0; i < condition.facts.length; i++) {
        result = await actionToInvoke.apply(null, [condition, condition.facts[i]]);

        if (result) {
          break;
        }

        idx++;
        if (!!entriesToCheck && idx === entriesToCheck) {
          break;
        }
      }
    } else {
      result = false;
    }

    return Promise.resolve(result);
  }


  static getConditionAction(condition) {
    let actionToInvoke = null;

    if (CommonAction.isCommon(condition)) {
      actionToInvoke = CommonAction.runAction;
    } else if (DateAction.isDate(condition)) {
      actionToInvoke = DateAction.runAction;
    } else if (ObjectAction.isObject(condition)) {
      actionToInvoke = ObjectAction.runAction;
    } else if (NumericAction.isNumeric(condition)) {
      actionToInvoke = NumericAction.runAction;
    } else if (StringAction.isString(condition)) {
      actionToInvoke = StringAction.runAction;
    }

    return actionToInvoke;
  }

}

export default ActionRunner;
