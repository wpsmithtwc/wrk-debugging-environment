var debug = require('debug')('twc:Facts BaseLoader');

class BaseLoader {

  loadData() {
    return {};
  }

  executeModel(model, params, modelName) {
    return model.execute(params)
      .then((data) => {
        if (!!data.error) {
          debug(`Error when hitting ${modelName}`);
          throw data.error;
        } else {
          return Promise.resolve(data);
        }
      })
      .catch((err) => {
        debug(`Error: ${err}`);
        return Promise.resolve({});
      });
  }

}

export default BaseLoader;
