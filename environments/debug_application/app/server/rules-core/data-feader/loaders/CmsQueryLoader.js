import CmsQuery from '@twc/dal/lib/ContentMedia/CmsQuery';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';

import BaseLoader from './BaseLoader';

class CmsQueryLoader extends BaseLoader {

  loadData(params = {}) {
    const cmsQuery = instantiateModel(CmsQuery, getApiConfig);
    const requestParams = {
      query: params.query,
      locale: params.locale,
      location: params.location
    };

    return this.executeModel(cmsQuery, requestParams, 'CmsQuery')
      .then((data) => (data || {}))
      .then((data) => Promise.resolve(data));
  }


}

export default new CmsQueryLoader();
