import fetch from 'isomorphic-fetch';

import { getApiConfig } from '../../config/api';
import BaseLoader from './BaseLoader';

class S3Loader extends BaseLoader {

  async loadDefinition(priority) {
    let promisesToResolve = [];
    let rulesBeforeCompose;
    let rulesAfterCompose;

    priority.forEach((priorityEntry) => {
      let ruleDefinition = fetch(this.createRuleUrl(priorityEntry))
        .then((rules) => Promise.resolve(rules.json()))
        .then((data) => Promise.resolve(data));

      promisesToResolve.push(ruleDefinition);
    });

    rulesBeforeCompose = await Promise.all(promisesToResolve);
    rulesAfterCompose = S3Loader.composeRules(rulesBeforeCompose);

    return rulesAfterCompose;
  }

  loadPriorities(rulesetAlias) {
    return fetch(this.createPriorityUrl(rulesetAlias))
      .then((priorities) => Promise.resolve(priorities.json()))
      .then((data) => Promise.resolve(data));
  }

  createRuleUrl(ruleName) {
    return `${getApiConfig('s3', 'ruleUrl')}${ruleName}.json`;
  }

  createPriorityUrl(priorityName) {
    return `${getApiConfig('s3', 'priorityUrl')}${priorityName}.json`;
  }

  static composeRules(rules) {
    return rules.map((rule) => rule[0]);
  }

}

export default new S3Loader();
