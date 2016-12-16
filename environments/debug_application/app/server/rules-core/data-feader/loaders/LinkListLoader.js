
import LinkList from '@twc/dal/lib/LinkList';
import instantiateModel from '@twc/dal/lib/utils/instantiateModel';

import { getApiConfig } from '../../config/api';

import BaseLoader from './BaseLoader';


class LinkListLoader extends BaseLoader {

  parseResponseData(responseData) {
    return {
      data: responseData,
      aliases: null
    };
  }

  loadData(params = {}) {
    const linkList = instantiateModel(LinkList, getApiConfig);
    const requestParams = {
      assetId: params.assetId,
      language: params.locale
    };

    return this.executeModel(linkList, requestParams, 'LinkList')
      .then((data) => (data || {}))
      .then((data) => Promise.resolve(data));
  }
}

export default new LinkListLoader();
