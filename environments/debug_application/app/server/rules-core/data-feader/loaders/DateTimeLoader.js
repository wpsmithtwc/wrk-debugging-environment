

import DateTime from '@twc/dal/lib/DateTime';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';

import BaseLoader from './BaseLoader';

class DateTimeLoader extends BaseLoader {

  parseResponseData(responseData) {
    return {
      data: responseData,
      aliases: null
    };
  }

  loadData(params = {}) {
    const dateTime = instantiateModel(DateTime, getApiConfig);
    const requestParams = {
      geocode: params.geocode
    };

    return this.executeModel(dateTime, requestParams, 'DateTime')
        .then((data) => ((data && this.parseResponseData(data.vt1currentDateTime)) || {}))
        .then((data) => Promise.resolve(data));
  }


}

export default new DateTimeLoader();
