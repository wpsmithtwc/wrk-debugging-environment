import ContentMedia from '@twc/dal/lib/ContentMedia/ContentMedia';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';

import BaseLoader from './BaseLoader';

class ContentMediaLoader extends BaseLoader {

  parseResponseData(responseData) {
    return {
      data: responseData,
      aliases: null
    };
  }

  loadData(params = {}) {
    const contentMedia = instantiateModel(ContentMedia, getApiConfig);
    const requestParams = {
      assetId: params.assetId,
      locale: params.locale,
      location: params.location
    };

    return this.executeModel(contentMedia, requestParams, 'ContentMedia')
      .then((data) => data || {})
      .then((data) => Promise.resolve(data));
  }
}

export default new ContentMediaLoader();
