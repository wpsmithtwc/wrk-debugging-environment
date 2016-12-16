
import Observation from '@twc/dal/lib/Observation';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';

import BaseLoader from './BaseLoader';

class ObservationLoader extends BaseLoader {

  parseResponseData(responseData) {
    return {
      data: responseData,
      aliases: null
    };
  }

  loadData(params = {}) {
    const observation = instantiateModel(Observation, getApiConfig);
    const requestParams = {
      geocode: params.geocode,
      language: params.language,
      units: params.units
    };

    return this.executeModel(observation, requestParams, 'Observation')
      .then((data) => ((data && this.parseResponseData(data.vt1observation)) || {}))
      .then((observs) => Promise.resolve(observs));
  }


}

export default new ObservationLoader();
