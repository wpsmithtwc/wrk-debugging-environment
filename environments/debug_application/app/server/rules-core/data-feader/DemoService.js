import lightningDemo from './demo/lightning.json';
import LightningLoader from './loaders/LightningLoader';

import dateTimeDemo from './demo/datetime.json';
import DateTimeLoader from './loaders/DateTimeLoader';

import forecastDemo from './demo/forecast.json';
import DailyForecastLoader from './loaders/DailyForecastLoader';

import precipitationDemo from './demo/precipitation.json';
import PrecipitationLoader from './loaders/PrecipitationLoader';

import drivingConditionsDemo from './demo/drivingConditions.json';
import DrivingConditionsLoader from './loaders/DrivingConditionsLoader';

import linkListDemo from './demo/linkList.json';
import LinkListLoader from './loaders/LinkListLoader';

import locationDemo from './demo/location.json';
import cmsQueryDemo from './demo/cmsQuery.json';

import contentMediaDemo from './demo/contentMedia.json';
import ContentMediaLoader from './loaders/ContentMediaLoader';

class DemoService {

  loadMissingData(loaderName) {
    return this.getData(loaderName);
  }

  getData(loaderName) {
    let data;

    switch (loaderName) {
      case 'lightning': data = LightningLoader.parseResponseData(lightningDemo);
        break;
      case 'dateTime': data = DateTimeLoader.parseResponseData(dateTimeDemo);
        break;
      case 'dailyForecast': data = DailyForecastLoader.parseResponseData(forecastDemo);
        break;
      case 'precipitation': data = PrecipitationLoader.parseResponseData(precipitationDemo);
        break;
      case 'drivingConditions': data = DrivingConditionsLoader.parseResponseData(drivingConditionsDemo);
        break;
      case 'linkList': data = LinkListLoader.parseResponseData(linkListDemo);
        break;
      case 'location': data = locationDemo;
        break;
      case 'cmsQuery': data = cmsQueryDemo;
        break;
      case 'contentMedia': data = ContentMediaLoader.parseResponseData(contentMediaDemo);
        break;
      default:
        data = null;
    }

    return data;
  }

}

export default new DemoService();
