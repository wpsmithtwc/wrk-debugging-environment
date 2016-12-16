
import Precipitation from '@twc/dal/lib/Precipitation';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';

import BaseLoader from './BaseLoader';

class PrecipitationLoader extends BaseLoader {

  parseResponseData(responseData) {
    return {
      data: responseData,
      aliases: null
    };
  }

  loadData(params = {}) {
    const precipitation = instantiateModel(Precipitation, getApiConfig);
    const requestParams = {
      geocode: params.geocode,
      language: params.language,
      units: params.units
    };

    return this.executeModel(precipitation, requestParams, 'Precipitation')
      .then((data) => ((data && this.parseResponseData(data.vt1precipitation)) || {}))
      .then((data) => Promise.resolve(data));
  }
}

export default new PrecipitationLoader();
