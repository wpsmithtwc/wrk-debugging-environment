var debug = require('debug')('twc:Rules BaseLoader');

class BaseLoader {

  getRules(priority) {
    return this.loadDefinition(priority);
  }

  async getPriorities(params = {}) {
    return await this.loadPriorities(params);
  }

  loadDefinition(priority) {
    debug(priority);

    return Promise.resolve([]);
  }

  loadPriorities(params = {}) {
    debug(params);

    return Promise.resolve([]);
  }

}

export default BaseLoader;
