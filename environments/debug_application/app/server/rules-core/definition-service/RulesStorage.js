import LocalLoader from './loaders/LocalLoader';
import S3Loader from './loaders/S3Loader';
import DemoLoader from './loaders/DemoLoader';
import { getApiConfig } from '../config/api';

class RulesStorage {

  constructor() {
    this.cachedRules = {};
    this.cachedPriorities = {};
    setInterval(() => {
      this.clearCache();
    }, getApiConfig('cacheTime'));
  }

  async getRules(params = {}, priority) {
    let loader;
    let rules;

    let rulesetAlias = params.priority;

    if (!!this.cachedRules[rulesetAlias]) {
      rules = this.cachedRules[rulesetAlias];
    } else {
      loader = this.getLoader(params.ruleset);
      rules = await loader.getRules(priority);
      this.cachedRules[rulesetAlias] = rules;
    }

    return Promise.resolve(rules);
  }

  async getPriorities(params = {}) {
    let loader;
    let priorities;

    let rulesetAlias = params.priority;

    if (!!this.cachedPriorities[rulesetAlias]) {
      priorities = this.cachedPriorities[rulesetAlias];
    } else {
      loader = this.getLoader(params.ruleset);
      priorities = await loader.getPriorities(rulesetAlias);
      this.cachedPriorities[rulesetAlias] = priorities;
    }

    return Promise.resolve(priorities);
  }

  clearCache() {
    this.cachedRules = {};
    this.cachedPriorities = {};
  }

  getLoader(loaderName) {
    let loader;

    switch (loaderName) {
      case 'demo': loader = DemoLoader;
        break;
      case 'local': loader = LocalLoader;
        break;
      case 's3': loader = S3Loader;
        break;
      default:
        loader = S3Loader;
    }

    return loader;
  }

}

export default new RulesStorage();
