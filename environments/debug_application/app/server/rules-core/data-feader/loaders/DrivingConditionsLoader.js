
import DrivingConditions from '@twc/dal/lib/DrivingConditions';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';

import BaseLoader from './BaseLoader';

class DrivingConditionsLoader extends BaseLoader {

  parseResponseData(responseData) {
    return {
      data: responseData,
      aliases: null
    };
  }

  loadData(params = {}) {
    const drivingConditions = instantiateModel(DrivingConditions, getApiConfig);
    const requestParams = {
      geocode: params.geocode,
      language: params.language
    };

    return this.executeModel(drivingConditions, requestParams, 'DrivingConditions')
      .then((data) => ((data && this.parseResponseData(data.drivingDifficultyIndex15minute)) || {}))
      .then((data) => Promise.resolve(data));
  }
}

export default new DrivingConditionsLoader();
