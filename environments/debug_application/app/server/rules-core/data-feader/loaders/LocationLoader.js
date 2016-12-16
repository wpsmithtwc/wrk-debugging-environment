import Location from '@twc/dal/lib/Location';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';
import BaseLoader from './BaseLoader';

class LocationLoader extends BaseLoader {

  loadData(params = {}) {
    const location = instantiateModel(Location, getApiConfig);
    const requestParams = {
      locId: params.location,
      locale: params.language
    };

    return this.executeModel(location, requestParams, 'Location')
      .then((data) => data || {})
      .then((data) => Promise.resolve(data));
  }
}

export default new LocationLoader();
