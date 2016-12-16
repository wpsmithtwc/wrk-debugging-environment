import _ from 'lodash';

import Alerts from '@twc/dal/lib/Alerts';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';
import BaseLoader from './BaseLoader';


class AlertsLoader extends BaseLoader {

  parseResponseData(data) {
    let aliases = data;

    // TODO - do we really need this? response seems to be different now, so it should be checked later
    if (Array.isArray(data.phenomenaCode)) {
      aliases.phenomenaSignificance = _.zipObject(data.phenomenaCode, data.significanceCode);
      aliases.phenomenaEffectiveTime = _.zipObject(data.phenomenaCode, data.effectiveTime);
    } else {
      aliases.phenomenaSignificance = {};
      aliases.phenomenaSignificance[data.phenomenaCode] = data.significanceCode;

      aliases.phenomenaEffectiveTime = {};
      aliases.phenomenaEffectiveTime[data.phenomenaCode] = data.effectiveTime;
    }

    return { data, aliases };
  }

  loadData(params = {}) {
    // TODO - process specific data from SUN API
    const alerts = instantiateModel(Alerts, getApiConfig);
    const requestParams = {
      geocode: params.geocode,
      language: params.language
    };

    return this.executeModel(alerts, requestParams, 'Alerts')
        .then((data) => (data ? this.parseResponseData(data.vt1alerts) : {}))
        .then((alrts) => Promise.resolve(alrts));
  }


}

export default new AlertsLoader();
