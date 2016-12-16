import DailyForecast from '@twc/dal/lib/DailyForecast';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';

import BaseLoader from './BaseLoader';

class DailyForecastLoader extends BaseLoader {

  parseResponseData(responseData) {
    return {
      data: responseData,
      aliases: {
        today: responseData[0],
        tomorrow: responseData[1]
      }
    };
  }

  // geocode, language
  loadData(params = {}) {
    const dailyForecast = instantiateModel(DailyForecast, getApiConfig);
    const requestParams = {
      geocode: params.geocode,
      language: params.language,
      units: params.units
    };

    return this.executeModel(dailyForecast, requestParams, 'DailyForecast')
      .then((data) => ((data && this.parseResponseData(data.vt1dailyForecast)) || {}))
      .then((observs) => Promise.resolve(observs));
  }
}

export default new DailyForecastLoader();
