

import Lightning from '@twc/dal/lib/Lightning';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';

import BaseLoader from './BaseLoader';

var debug = require('debug')('twc:Lightning Loader');

class LightningLoader extends BaseLoader {

  parseResponseData(responseData) {
    return {
      data: responseData,
      aliases: null
    };
  }

  loadData(params = {}) {
    const lightning = instantiateModel(Lightning, getApiConfig);
    const requestParams = {
      geocode: params.geocode,
      language: params.language
    };

    return this.executeModel(lightning, requestParams, 'Lightning')
        .then((data) => ((data && this.parseResponseData(data.vt1lightning)) || {}))
        .then((data) => Promise.resolve(data))
        .catch((err) => {
          debug(err);

          return Promise.resolve({});
        });
  }


}

export default new LightningLoader();
